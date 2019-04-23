import React, { Component } from 'react';
import { Label, Rating } from 'semantic-ui-react';


class RatingComponent extends Component {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.state = {
            isHovering: false,
            userRating: this.props.userRating,
        };
    }

    handleClickRating = (e, { rating }) => {
        this.props.addRating(this.props.subject_id, this.props.userId, rating);
        this.setState({ userRating: rating });
    };

    handleMouseHover() {
        this.setState({ isHovering: true });
    }

    handleMouseLeave() {
        this.setState({ isHovering: false });
    }

    renderUserVote() {
        let valueToDisplay = 0;
        if (this.state.userRating) {
            valueToDisplay = this.state.userRating;
        }

        return (
            <div>
                { ' ' }
                <Label basic color="blue" pointing>
                    Your vote:
                    <Rating icon="star" defaultRating={ valueToDisplay } maxRating={ 5 } onRate={ this.handleClickRating }/>
                </Label>
            </div>
        );
    }

    render() {
        let valueToDisplay = this.props.currentRating;

        return (
            <div onMouseEnter={ this.handleMouseHover } onMouseLeave={ this.handleMouseLeave }>
                <Label basic color="blue" ribbon>
                    <Rating icon="star" defaultRating={ valueToDisplay } maxRating={ 5 } disabled/>
                    { this.state.isHovering ? this.renderUserVote() : '' }
                </Label>
            </div>
        );
    }
}


export default RatingComponent;
