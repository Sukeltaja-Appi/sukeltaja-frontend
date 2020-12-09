import React from 'react'
import Svg, { Rect, Path, G } from 'react-native-svg'

const BackgroundImage = (props) => {

  const extraStyles = props.style ? props.style : {}
  const extraProps = { ...props, style: undefined }

  delete extraProps.style

  return (
    <React.Fragment>
      <Svg height='100%' width='100%' viewBox='0 0 100 100'
        style={{ height: '100%', position: 'absolute', ...extraStyles }} preserveAspectRatio="none" {...extraProps}>
        <G transform="translate(-6.696377,-194.83924)">
          <G transform="translate(-43.845242,105.07738)">
            <G transform="translate(50.541619,-107.238)">
              <Rect x="9.507349e-05" y="196.99995" height="100" width="100" fill="#118bfc" opacity="1" />
              <Path transform="scale(0.26458333)"
                // eslint-disable-next-line max-len
                d="M 299.66406,744.56641 C 25.159468,854.51843 99.055821,879.50777 113.64258,923.51953 129.63666,966.11428 106.38745,1045.3848 0,1122.5195 H 377.95312 V 744.56641 Z"
                fill="#12bcff" opacity="1" />
            </G>
          </G>
        </G>
      </Svg>
      {props.children}
    </React.Fragment>
  )
}

export default BackgroundImage
