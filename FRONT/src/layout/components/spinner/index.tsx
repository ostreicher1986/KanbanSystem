import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Size } from '../../../layout/styles/spinner'

interface SpinnerInterface {
    style?: object,
    animationDuration?: string,
    strokeWidth?: string
}

const Spinner: React.FC<SpinnerInterface> = (props) => {

    return (
        <ProgressSpinner
            style={props.style}
            animationDuration={props.animationDuration}
            strokeWidth={props.strokeWidth}
        />
    )

}

Spinner.defaultProps = {
    style: Size,
    animationDuration: "10s",
    strokeWidth: "5"
} as Partial<SpinnerInterface>

export default Spinner