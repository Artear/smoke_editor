/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";


export default class extends React.Component {
  render() {
    return (
        <svg {...this.props} height="24" width="24">
            <path fill="white" stroke="null" id="svg_3" d="m11.980303,0c-6.61591,0 -11.979303,5.363552 -11.979303,11.979463c0,6.615751 5.363393,11.979702 11.979303,11.979702s11.979702,-5.363952 11.979702,-11.979702c0,-6.61607 -5.363792,-11.979463 -11.979702,-11.979463zm0.036498,17.631167l0,-0.00016l-0.073156,0l-5.11709,0c0,-3.74214 3.286591,-3.741261 4.015916,-4.719763l0.083459,-0.446204c-1.024664,-0.51928 -1.747998,-1.771239 -1.747998,-3.235478c0,-1.929052 1.254834,-3.493121 2.802372,-3.493121c1.547538,0 2.802372,1.56407 2.802372,3.493121c0,1.45178 -0.710476,2.695912 -1.721483,3.223418l0.095039,0.507061c0.800164,0.931062 3.977421,0.99176 3.977421,4.671126l-5.11685,0z"/>
        </svg>
    );
  }
}



