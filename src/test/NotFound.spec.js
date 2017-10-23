/**
 * Created by Karo on 23.10.2017.
 */
/**
 * Created by Karo on 23.10.2017.
 */

import React from 'react';
import {expect} from 'chai';
import {MuiMountWithContext} from './testUtils'
import HomePage from '../components/HomePage';
import RaisedButton from 'material-ui/RaisedButton'
import sinon from 'sinon'



describe('<HomePage />', () => {
    it('must have  two <RaisedButton/> components', function () {
        const wrapper = MuiMountWithContext(<HomePage />);
        expect(wrapper.find(RaisedButton)).to.have.length(2);
    });
    it('must have one img',()=>{
        const wrapper = MuiMountWithContext(<HomePage />);
        expect(wrapper.find('img')).to.have.length(1);
    });

    it('calls componentDidMount once', () => {
        sinon.spy(HomePage.prototype, 'componentDidMount');
        const wrapper = MuiMountWithContext(<HomePage />);
        expect(HomePage.prototype.componentDidMount.calledOnce).to.equal(true);
    });
    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = MuiMountWithContext((
            <HomePage onButtonClick={onButtonClick} />
        ));
        wrapper.find(RaisedButton).first().simulate('click');
        expect(onButtonClick.calledOnce);
    });
});



