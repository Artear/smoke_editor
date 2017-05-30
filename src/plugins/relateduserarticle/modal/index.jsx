import React from 'react';
import { insertDataBlock} from 'megadraft';
import { ModalDialog, ModalContainer } from 'react-modal-dialog';
import axios from 'axios';
import config from '../config';

import { extractArticleIdFromInput } from '../utils';
import UserArticleFetchSection from './UserArticleFetchSection';
import Header from './Header';

const ERR_ARTICLE_HAS_NO_MEDIA = 'La nota seleccionada no posee imagen/video';

const initialState = {
    isFocused: false,
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

    componentDidUpdate() {
        if (this.state.isShowingModal && this.state.isFocused == false) {
            this.setFocus();
        }
    }

    /**
     * Fetches user article from Drupal service endpoint and updates fetching state.
     * If article is received, saveData() is called.
     * If an error is raised, state.errorMessage is updated with the given error.
     */
    getUserArticle = () => {
        const articleId = extractArticleIdFromInput(this.input.value);
        const url = `${config.articleUrl}${articleId}`;

        this.setState({ isFetching: true });

        axios.get(url)
            .then(response => {
                const userArticle = response.data;

                if (this.validateArticle(userArticle)) {
										this.setState({
											userArticle
										});
                    //setTimeout(() => this.saveData(article), 0);
                }
            })
            .catch(response => {
                this.setState({
                    errorMessage: response.data,
										userArticle: null
                });
            })
            .then(() => {
                this.setState({ isFetching: false });
            });
    };

    saveData = article => {
        this.addData(article);
        this.handleClose();
    };

    /**
     * Inserts the draft block into the editor.
     */
    addData = (article) => {
        const data = {
            type: 'relateduserarticle',
            dataType: 'relateduserarticle',
            article: {
                nid: article.nid,
                image: article.image,
                kaltura_id: article.kaltura_id
            }
        };

        this.props.onChange(insertDataBlock(this.props.editorState, data));
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

    setFocus = () => {
        this.setState({ isFocused: true });
    };

    handleClose = () => {
        this.setState({
            ...initialState,
            isShowingModal: false
        });

        this.props.closeModal();

        this.setState({ isFocused: false });
    };

		onArticleIdChange = (e) => {
        this.setState({
            errorMessage: null
        });
    };

    render() {
        return (
            <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog className="modal-dialog modal-dialog-plugin-relateduserarticle" width="400" onClose={this.handleClose}>
                        <Header error={this.state.errorMessage} />

												<UserArticleFetchSection
														onChange={this.onArticleIdChange}
														onClick={this.getUserArticle}
														enableFetch={this.state.enableFetch}
														isFetching={this.state.isFetching} />

												{
													this.state.userArticle &&
														<UserArticleMediaSelector
															userArticle={this.userArticle}
															onMediaSelect={this.selectArticleMedia} />
												}
                    </ModalDialog>
                </ModalContainer>
            }
            </div>
        );
    }
}
