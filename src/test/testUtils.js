/**
 * Created by Karo on 23.10.2017.
 */
import { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
const muiTheme = getMuiTheme();
export const MuiMountWithContext = node => mount(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: PropTypes.object },
});
export const MuiShallowWithContext = node => shallow(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: PropTypes.object },
});
