import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
    { label: 'Accounting' },
    { label: 'Airlines/Aviation' },
    { label: 'Marketing and Advertising' },
    { label: 'IT' }
];

function renderInputComponent(inputProps) {
    const { classes, label, inputRef = () => {}, ref, meta: { error }, ...custom } = inputProps;

    return (
        <TextField
            placeholder={label}
            label={label}
            type="text"
            fullWidth
            InputProps={{ disableUnderline: true, className: classes.inputField, inputRef: node => {
                ref(node);
                inputRef(node);
            }}}
            InputLabelProps={{ FormLabelClasses: { focused: classes.formLabelFocused }, className: classes.inputLabel, classes:{ shrink: classes.inputLabelShrink }}}
            FormHelperTextProps={{error:  error && true}}
            helperText={error}
            autoComplete="off"
            classes={{ root: classes.formControl }}
            {...custom}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <Typography color="primary">
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <strong key={String(index)}>
                            {part.text}
                        </strong>
                    ) : (
                        <Fragment key={String(index)}>
                            {part.text}
                        </Fragment>
                    );
                })}
            </Typography>
        </MenuItem>
    );
}

function getSuggestions(value) {
    
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const styles = theme => ({
    popper: {
        zIndex: 5,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    formControl: {
        marginBottom: "8px"
    },
    inputField: {
        height: 50,
        color: theme.palette.primary.main,
        borderRadius: 2,
        border: 0,
        background: theme.palette.secondary.light,
        padding: "0 24px",
        fontSize: "16px",
        fontWeight: "normal"
    },
    inputLabel: {
        zIndex: 1,
        color: theme.palette.secondary.main,
        transform: "translate(24px, 33px) scale(1)",
        pointerEvents: "none"
    },
    formLabelFocused: {
        color: theme.palette.secondary.main + "!important"
    },
    inputLabelShrink: {
        transform: "translate(0px, 0px) scale(0.75)",
        transformOrigin: "top left"
    },
});

class Industry extends Component {
    state = {
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleSuggestionSelected = (event, { suggestionValue, method }) => {
        const { input } = this.props;
        input.onChange(suggestionValue);
        if (method === 'enter') {
            event.preventDefault();
        }
    }

    render() {
        const { classes, input, meta, label } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            onSuggestionSelected: this.handleSuggestionSelected,
            getSuggestionValue,
            renderSuggestion,
        };

        return (
            <Fragment>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        label: label,
                        inputRef: node => {
                            this.popperNode = node;
                        },
                        meta: meta,
                        ...input
                    }}
                    theme={{
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                        <Popper anchorEl={this.popperNode} open={Boolean(options.children)} className={classes.popper}>
                            <Paper
                                square
                                {...options.containerProps}
                                style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                            >
                                {options.children}
                            </Paper>
                        </Popper>
                    )}
                />
            </Fragment>
        );
    }
}

const trim = value => (value && value.replace(/\s\s+/g, ' ').replace(/^\s+/,''));

const IndustryField = ({ name, label, classes, addIndustry}) => (
    <Field 
        name={name} 
        component={Industry} 
        classes={classes} 
        label={label}
        normalize={trim}
        addIndustry={addIndustry}
    />
)

export default withStyles(styles)(IndustryField);