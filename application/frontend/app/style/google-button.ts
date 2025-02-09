import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  materialButton: {
    backgroundColor: 'white',
    borderColor: '#747775',
    borderWidth: 1,
    borderRadius: 20,
    boxSizing: 'border-box',
    color: '#1f1f1f',
    cursor: 'pointer',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    height: 40,
    letterSpacing: 0.25,
    paddingHorizontal: 12,
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    // maxWidth: 400,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  materialButtonIcon: {
    height: 20,
    marginRight: 12,
    width: 20,
  },
  materialButtonContentWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },
  materialButtonContents: {
    flexGrow: 1,
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
  },
  materialButtonState: {
    bottom: 0,
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  disabled: {
    cursor: 'default',
    backgroundColor: '#ffffff61',
    borderColor: '#1f1f1f1f',
  },
  disabledContents: {
    opacity: 0.38,
  },
  disabledIcon: {
    opacity: 0.38,
  },
  activeOrFocusState: {
    backgroundColor: '#303030',
    opacity: 0.12,
  },
  hover: {
    shadowColor: 'rgba(60, 64, 67, .30)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  hoverState: {
    backgroundColor: '#303030',
    opacity: 0.08,
  },
});

export default styles;
