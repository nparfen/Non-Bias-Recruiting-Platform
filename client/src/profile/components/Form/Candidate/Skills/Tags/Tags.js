import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';

import Close from '@material-ui/icons/Close';

import TagsInput from 'react-tagsinput'

import { withStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
    const { classes, label, value, onChange, inputRef = () => {}, ref, addTag, ...custom } = inputProps;

    return (
        <FormControl fullWidth={true}>
            <InputLabel 
                FormLabelClasses={{ focused: classes.formLabelFocused }}
                className={classes.inputLabel}
                classes={{ shrink: classes.inputLabelShrink }}
            >
                {label}
            </InputLabel>
            <Input
                {...custom}
                type="text"
                className={classes.inputField}
                placeholder={label}
                autoComplete="off"
                disableUnderline={true}
                inputRef={node => {
                    ref(node);
                    inputRef(node);
                }}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <Button 
                            className={classes.addInputButton}
                            variant="contained"
                            color="secondary"
                            onClick={() => addTag(value)}
                        >
                            Add
                        </Button>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

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

function getSuggestions(value, suggestions) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
          count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion;
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
    inputField: {
        height: 50,
        color: theme.palette.primary.main,
        borderRadius: 2,
        border: 0,
        background: theme.palette.secondary.light,
        padding: "0px",
        paddingLeft: "24px",
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
    tag: {
        wordBreak: "break-word",
        borderRadius: "2px",
        backgroundColor: theme.palette.secondary.dark,
        fontWeight: 500,
        color: "white",
        display: "inline-block",
        padding: "10px 15px",
        marginRight: "12px",
        marginTop: "12px",
        whiteSpace: "normal",
        "&$unselectedTag":{
            cursor: "pointer",
            color: theme.palette.primary.main,
            backgroundColor: "#efeff4",
        }
    },
    unselectedTag: {},
    removeIcon: {
        width: "18px",
        height: "18px",
        marginLeft: "8px",
        verticalAlign: "middle",
        cursor: "pointer"
    },
    addInputButton: {
        height: 50,
        borderRadius: 2,
        border: 0,
        padding: "0 16px",
        fontSize: "15px",
        fontWeight: 500,
        textTransform: "initial",
        boxShadow: "none !important",
        whiteSpace: "nowrap",
        color: "white",
        '&:disabled':{
            color: "#f9f9f9"
        },
    },
});

const Autocomplete = ({ classes, popperNode, suggestions, handleSuggestionsClearRequested, handleSuggestionsFetchRequested, addTag, label, ...props }) => {

    const handleSuggestionSelected = (event, { suggestionValue, method }) => {
        addTag(suggestionValue);
        if (method === 'enter') {
            event.preventDefault();
        }
    }

    const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
            e.preventDefault()
        } else {
            props.onChange(e)
        }
    }

    const autosuggestProps = {
        renderInputComponent,
        suggestions: suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        onSuggestionSelected: handleSuggestionSelected,
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
                    onChange: handleOnChange, 
                    addTag: addTag,
                    ...props
                }}
                theme={{
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Popper anchorEl={popperNode} open={Boolean(options.children)} className={classes.popper}>
                        <Paper
                            square
                            {...options.containerProps}
                            style={{ width: popperNode ? popperNode.clientWidth : null }}
                        >
                            {options.children}
                        </Paper>
                    </Popper>
                )}
            />
        </Fragment>
    );
}

const defaultRenderTag = (props) => {

    let {tag, key, disabled, removeTag, getTagDisplayValue, classes } = props

    return (
        <Typography 
            key={key}
            className={classes.tag}
        >
            {getTagDisplayValue(tag)}
            {!disabled && <Close className={classes.removeIcon} onClick={() => removeTag(tag)} onKeyDown={() => removeTag(tag)}/>}
        </Typography>
    )
}

const defaultRenderLayout = (tagComponents, inputComponent) => {
    return (
        <div>
            <div>
                {inputComponent}
            </div>
            <div>
                {tagComponents}
            </div> 
        </div>
    )
}

class TagsField extends Component {

    state = {
        suggestions: []
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        
        let { data, formValues, name } = this.props

        let tags = _.get(formValues, name, []);
        let inputValue = (value && value.trim().toLowerCase()) || ''
        let suggestions = _.filter(data, name => _.includes(name.toLowerCase(), inputValue) && !_.includes(tags,name))

        this.setState({suggestions: getSuggestions(value, suggestions)});
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (tag) => {
        let { addSkills, formValues, name } = this.props;
        let lTag = _.last(tag);
        let tags = _.concat(_.get(formValues, name, []), lTag);
        addSkills(name, tags);
    }

    chooseTag = (tag) => {
        let { addSkills, formValues, name } = this.props
        let newTags = _.concat(_.get(formValues, name, []), tag);
        addSkills(name, newTags)
    }

    removeTag = (tag) => {
        let { addSkills, formValues, name } = this.props
        let newTags = _.filter(_.get(formValues, name, []), name => !_.includes(name, tag));
        addSkills(name, newTags)
    }

    render () {

        let { suggestions } = this.state;
        let { name, label, classes, formValues } = this.props;

        const tags = _.get(formValues, name, []);

        return (
            <TagsInput 
                renderLayout={defaultRenderLayout}
                renderTag={defaultRenderTag}
                renderInput= {Autocomplete} 
                value={tags}
                removeKeys={[]}
                tagProps={
                    {
                        classes: classes,
                        chooseTag: this.chooseTag,
                        removeTag: this.removeTag,
                    }
                } 
                inputProps={{
                    classes: classes,
                    suggestions: suggestions,
                    label: label,
                    inputRef: node => {
                        this.popperNode = node;
                    },
                    popperNode: this.popperNode,
                    handleSuggestionsClearRequested: this.handleSuggestionsClearRequested,
                    handleSuggestionsFetchRequested: this.handleSuggestionsFetchRequested
                }}
                onChange={this.handleChange}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(TagsField));