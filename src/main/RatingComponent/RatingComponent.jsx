import React, { Component } from 'react';
import { Label, Rating } from 'semantic-ui-react';
import { LaMaSColours } from '../../utils/colourPalettes';


class RatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false,
        };
    }

    handleClickRating = (e, { rating }) => {
        this.props.addRating(this.props.subject_id, this.props.userId, rating);
        this.setState({ userRating: rating });
    };

    handleMouseHover = () => {
        this.setState({ isHovering: true });
    };

    handleMouseLeave = () => {
        this.setState({ isHovering: false });
    };

    renderUserVote = () => {
        const { t } = this.props;
        return (
            <>
                { ' ' }
                <Label basic color={ LaMaSColours.dominant } pointing={ 'left' }>
                    { t('rating.yourVote') }
                    <Rating icon="star" defaultRating={ this.props.userRating } maxRating={ 5 } onRate={ this.handleClickRating }/>
                </Label>
            </>
        );
    };

    render() {
        let valueToDisplay = this.props.currentRating;

        return (
            <div onMouseEnter={ this.handleMouseHover } onMouseLeave={ this.handleMouseLeave }>
                <Label basic color={ LaMaSColours.dominant } ribbon>
                    <Rating key={ valueToDisplay } icon="star" defaultRating={ valueToDisplay } maxRating={ 5 } disabled/>
                    { this.state.isHovering ? this.renderUserVote() : '' }
                </Label>
            </div>
        );
    }
}


export default RatingComponent;
