import { components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <div
          className={
            props.selectProps.menuIsOpen
              ? "far fa-angle-up"
              : "far fa-angle-down"
          }
        ></div>
      </components.DropdownIndicator>
    )
  );
};
const react_select_xs_Styles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#FFF" : "#333",
    backgroundColor: state.isSelected ? "#f3772c" : "#FFF",
    padding: "8px 15px",
    "&:hover": {
      backgroundColor: state.isFocused ? "#f3772c" : "#FFF",
      color: state.isFocused ? "#FFF" : "#333",
    },
  }),
  control: () => ({
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 28,
    lineHeight: "28px",
    padding: "0px 5px",
    fontSize: 14,
    outline: 0,
    border: "1px solid #4b4b4b",
    borderRadius: 6,
    backgroundColor: "#242424",
    color: "#FFF",
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    lineHeight: "0px",    
  }),
  menu: (styles) => ({
    ...styles,
    marginTop: 2,    
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};
const react_select_sm_Styles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#606060" : "#333",
    backgroundColor: state.isSelected ? "#f3772c" : "#606060",
    padding: "8px 15px",
    "&:hover": {
      backgroundColor: state.isFocused ? "#f3772c" : "#606060",
      color: state.isFocused ? "#FFF" : "#333",
    },
  }),
  control: () => ({
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 38,
    lineHeight: "38px",
    padding: "0px 10px",
    fontSize: 14,
    outline: 0,
    border: "1px solid #4b4b4b",
    borderRadius: 6,
    backgroundColor: "transparent",
    color: "#FFF",
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    lineHeight: "0px",    
  }),
  menu: (styles) => ({
    ...styles,
    marginTop: 2,    
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};
const react_select_lg_Styles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#FFF" : "#dbdbdb",
    backgroundColor: state.isSelected ? "#f3772c" : "#FFF",
    padding: "8px 15px",
    "&:hover": {
      backgroundColor: state.isFocused ? "#f3772c" : "#FFF",
      color: state.isFocused ? "#FFF" : "#dbdbdb",
    },
  }),
  control: () => ({
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 56,
    lineHeight: "45px",
    padding: "0px 10px",
    fontSize: 16,
    outline: 0,
    border: "1px solid #4b4b4b",
    borderRadius: 15,
    backgroundColor: "transparent",
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    lineHeight: "0px",    
  }),
  menu: (styles) => ({
    ...styles,
    marginTop: 2,    
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};
const react_select_lg_Styles_light = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#FFF" : "#dbdbdb",
    backgroundColor: state.isSelected ? "#f3772c" : "#FFF",
    padding: "8px 15px",
    "&:hover": {
      backgroundColor: state.isFocused ? "#f3772c" : "#FFF",
      color: state.isFocused ? "#FFF" : "#dbdbdb",
    },
  }),
  control: () => ({
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 56,
    lineHeight: "45px",
    padding: "0px 10px",
    fontSize: 16,
    outline: 0,
    border: "1px solid #4b4b4b",
    borderRadius: 15,
    backgroundColor: "#242424",
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    lineHeight: "0px",    
  }),
  menu: (styles) => ({
    ...styles,
    marginTop: 2,  
    color: "#dbdbdb"      
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};
export { DropdownIndicator,react_select_xs_Styles, react_select_sm_Styles, react_select_lg_Styles, react_select_lg_Styles_light };
