import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import './autosuggest.css'


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, people) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');

    return people.filter(person => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
    return `${suggestion.firstName} ${suggestion.lastName}`;
}

function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.firstName} ${suggestion.lastName}`;
    return (
        <span className={suggestion.id}>
            <span className="name">
                <span className={'suggestion-text'} key={suggestionText}>{suggestionText}</span>
            </span>
        </span>
    );
};

class UserSuggest extends React.Component {
    constructor(props) {
        super(props);
        const { value } = this.props;
        this.state = {
            value: value ? value : '',
            suggestions: [],
            people: this.props.users
        };
    };

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.people)
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ people: this.props.users })
        }
    }

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [], value: '' });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Type a name",
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={this.props.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    };
};

export default UserSuggest;