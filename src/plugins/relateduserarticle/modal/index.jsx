import React from 'react';
import axios from 'axios';
import { insertDataBlock} from 'megadraft';
import { ModalDialog, ModalContainer } from 'react-modal-dialog';
import config from '../config';
import Header from './Header';
import UserArticleFetchSection from './UserArticleFetchSection';
import UserArticleMediaSelector from './UserArticleMediaSelector';

const ERR_ARTICLE_HAS_NO_MEDIA = 'La nota seleccionada no posee imagen/video';

const initialState = {
    enableFetch: false,
    errorMessage: null,
		userArticle: null
};

export default class RelatedUserArticleModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowingModal: this.props.isShowingModal,
            ...initialState
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowingModal: nextProps.isShowingModal,
            errorMessage: null
        });
    }

    /**
     * Fetches user article from Drupal service endpoint and updates fetching state.
     * If article is received, saveData() is called.
     * If an error is raised, state.errorMessage is updated with the given error.
     */
		fetchUserArticle = (userArticleId) => {
        const url = `${config.articleUrl}${userArticleId}`;

        this.setState({ isFetching: true });

        axios.get(url)
            .then(response => {
                const userArticle = response.data;

                if (this.validateArticle(userArticle)) {
										this.setState({
											userArticle
										});
                }
            })
            .catch(response => {
                this.setState({
                    errorMessage: response.data,
										userArticle: null
                });
                console.error(response);
            })
            .then(() => {
                this.setState({ isFetching: false });
            });
    };

    /**
     * Inserts the draft block into the editor.
     */
    addData = () => {
        const data = {
            type: 'relateduserarticle',
            dataType: 'relateduserarticle',
						data: {
								nid:  this.state.userArticle.nid,
								selectedMedia: this.state.selectedMedia
						}
        };

        this.props.onChange(insertDataBlock(this.props.editorState, data));
				this.handleClose();
    };

    validateArticle = (article) => {
        if (!article.images && !article.videos) {
            this.setState({
                errorMessage: ERR_ARTICLE_HAS_NO_MEDIA
            });

            return false;
        }

        return true;
    };

    handleClose = () => {
        this.setState({
            ...initialState,
            isShowingModal: false
        });

        this.props.closeModal();
    };

		onArticleIdChange = (e) => {
        this.setState({
            errorMessage: null
        });
    };

		selectMedia = (media) => {
				this.setState({
						selectedMedia: media
				}, this.addData);
		};

    render() {
        return (
            <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog className="modal-dialog plugin-relateduserarticle-modal" width="700" onClose={this.handleClose}>
                        <Header error={this.state.errorMessage} />

												<UserArticleFetchSection
														onChange={this.onArticleIdChange}
														fetchUserArticle={this.fetchUserArticle}
														enableFetch={this.state.enableFetch}
														isFetching={this.state.isFetching} />

												{
													this.state.userArticle &&
														<UserArticleMediaSelector
															userArticle={this.state.userArticle}
															selectMedia={this.selectMedia} />
												}
                    </ModalDialog>
                </ModalContainer>
            }
            </div>
        );
    }
}
