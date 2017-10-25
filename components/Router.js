import {StackNavigator} from 'react-navigation';
import Index from '../src/';
import Login from '../src/Login';
import Register from '../src/Register';
import Menu from '../src/home_screen/Menu';
import AddStudio from '..//src/home_screen/Add Studio';

export const Stack = StackNavigator({
	Index: { screen:Index },
	Login: { screen:Login },
	Register: { screen:Register },
	Menu : { screen:Menu },
	Add : { screen:AddStudio },
})
