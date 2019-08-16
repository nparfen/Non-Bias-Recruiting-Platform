import React, { Component, Fragment } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    popper: {
        zIndex: 5,
    },
    menuList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    menuItem: {
        display: 'block',
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

function renderSuggestion(suggestion, query) {
    
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        parts.map((part, index) => {
            return part.highlight ? (
                <strong key={String(index)}>
                    {part.text}
                </strong>
            ) : (
                <Fragment key={String(index)}>
                    {part.text}
                </Fragment>
            );
        })
    );
}

class LocationField extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            errorMessage: "",
            isGeocoding: false
        }
    }

    handleChange = address => {
        let { setLocationAddress } = this.props;
        this.setState({ errorMessage: "" });
        setLocationAddress(address);
    }

    handleSelect = selected => {
        let { setLocationCoords, setLocationAddress } = this.props;
        this.setState({ isGeocoding: true});
        setLocationAddress(selected);
        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then((latLng) => {
                setLocationCoords(latLng)
                this.setState({ isGeocoding: false });
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
            });
    };

    handleError = (status, clearSuggestions) => {
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };

    render() {

        let { isGeocoding, errorMessage } = this.state;
        let { name, label, value, classes, error } = this.props;

        return (
            <Fragment>
                <PlacesAutocomplete
                    value={value}
                    onChange={(address) => this.handleChange(address)}
                    onSelect={(selected) => this.handleSelect(selected)}
                    onError={this.handleError}
                    shouldFetchSuggestions={value.length > 2}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                        return (
                            <Fragment>
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
                                        name={name}
                                        className={classes.inputField}
                                        placeholder={label}
                                        autoComplete="off"
                                        disableUnderline={true}
                                        inputProps={{
                                            ref: node => {
                                                this.popperNode = node;
                                            },
                                        }}
                                        {...getInputProps()}
                                    />
                                </FormControl>
                                {isGeocoding && <Typography color="secondary"><small>Loading...</small></Typography>}
                                {suggestions.length > 0 && (
                                    <Popper anchorEl={this.popperNode} open className={classes.popper}>
                                        <Paper 
                                            square
                                            style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                                        >
                                            <MenuList component="div" className={classes.menuList}>
                                                {loading && <MenuItem component="div" className={classes.menuItem}><Typography color="secondary">Loading...</Typography></MenuItem>}
                                                {suggestions.map(suggestion => {
                                                    return (
                                                        <MenuItem component="div" selected={suggestion.active} className={classes.menuItem}
                                                            {...getSuggestionItemProps(suggestion)}>
                                                            <Typography color="primary">{renderSuggestion(suggestion.description, value)}</Typography>
                                                        </MenuItem>
                                                    );
                                                })}
                                            </MenuList>
                                        </Paper>
                                    </Popper>
                                )}
                            </Fragment>
                        );
                    }}
                </PlacesAutocomplete>
                {
                    errorMessage.length > 0 ? 
                        <Typography color="error"><small>{errorMessage}</small></Typography> 
                        :
                        !isGeocoding && error && <Typography color="error"><small>{error}</small></Typography>
                }
            </Fragment>
        )
    }

}

export default withStyles(styles)(LocationField);