import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import classNames from 'classnames';
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

import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';

import TagsInput from 'react-tagsinput'

import { withStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
    const { classes, label, value, onChange, onBlur, inputRef = () => {}, ref, addTag, ...custom } = inputProps;

    return (
        <FormControl 
            className={classes.formControl}
            fullWidth={true}
        >
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
                onBlur={onBlur}
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
    formControl: {
        marginBottom: "8px"
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
        marginBottom: "12px",
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
    addButton: {
        border: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "8px",
        fontSize: "16px",
        fontWeight: "normal",
        textTransform: "initial",
        boxShadow: "none !important",
        minHeight: "inherit",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
        },
    },
    addIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
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

const Autocomplete = ({ classes, popperNode, suggestions, handleSuggestionsClearRequested, handleSuggestionsFetchRequested, addTag, label, onBlur, ...props }) => {

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
                    onBlur: onBlur,
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

    let {tag, data, selectedTags, key, disabled, chooseTag, removeTag, onRemove, classNameRemove, getTagDisplayValue, classes, ...other} = props

    return (
        <Typography 
            key={key}
            className={classNames(classes.tag, _.includes(data, tag) && !_.includes(selectedTags, tag) && classes.unselectedTag)} 
            onClick={_.includes(data, tag) && !_.includes(selectedTags, tag) ? () => chooseTag(tag) : null} 
            onKeyPress={_.includes(data, tag) && !_.includes(selectedTags, tag) ? () => chooseTag(tag) : null}
            {...other}
        >
            {getTagDisplayValue(tag)}
            {!disabled && _.includes(selectedTags, tag) && <Close className={classes.removeIcon} onClick={() => removeTag(tag)} onKeyDown={() => removeTag(tag)}/>}
        </Typography>
    )
}

const renderButtonComponent = ({ changeInput, classes }) => {
    return (
        <Button 
            color="secondary" 
            onClick={changeInput} 
            className={classes.addButton}
        >
            <Add className={classes.addIcon} />
            <span className="align-middle">Add</span>
        </Button>
    )
}

const defaultRenderLayout = (tagComponents, inputComponent) => {
    return (
        <div>
            <div>
                {tagComponents}
            </div> 
            <div>
                {inputComponent}
            </div>
        </div>
    )
}

class TagsField extends Component {

    state = {
        showInput: false,
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
        let { addTags, formValues, name } = this.props;
        let lTag = _.last(tag);
        let tags = _.concat(_.get(formValues, name, []), lTag);
        addTags(name, tags);
    }

    chooseTag = (tag) => {
        let { addTags, formValues, name } = this.props
        let newTags = _.concat(_.get(formValues, name, []), tag);
        addTags(name, newTags)
    }

    removeTag = (tag) => {
        let { addTags, formValues, name } = this.props
        let newTags = _.filter(_.get(formValues, name, []), name => !_.includes(name, tag));
        addTags(name, newTags)
    }

    render () {

        let { showInput, suggestions } = this.state;
        let { name, label, classes, data, formValues } = this.props;

        const selectedTags = _.get(formValues, name, []);
        const tags = _.union(selectedTags, data);

        return (
            <TagsInput 
                renderLayout={defaultRenderLayout}
                renderTag={defaultRenderTag}
                renderInput={showInput ? Autocomplete : renderButtonComponent} 
                value={tags}
                removeKeys={[]}
                tagProps={
                    {
                        classes: classes,
                        chooseTag: this.chooseTag,
                        removeTag: this.removeTag,
                        data: data,
                        selectedTags: selectedTags
                    }
                } 
                inputProps={
                    showInput ? 
                        {
                            classes: classes,
                            suggestions: suggestions,
                            label: label,
                            inputRef: node => {
                                this.popperNode = node;
                            },
                            popperNode: this.popperNode,
                            handleSuggestionsClearRequested: this.handleSuggestionsClearRequested,
                            handleSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
                            onBlur:(event) => {if(event.target.value === "") {this.setState({showInput:!showInput})}}
                        }
                        :
                        {
                            classes: classes,
                            changeInput: () => {this.setState({showInput:!showInput})}
                        }
                }
                onChange={this.handleChange}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(TagsField));