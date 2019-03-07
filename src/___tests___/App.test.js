import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub } from 'sinon';

import DisplayResult from '../Components/displayResult'
import App from '../App';
import CalculationMethod from '../Components/CalculationMethod'

describe('<App />', () => {

  it('shows metric as the standard method', () => {
    const component = shallow(<App />);
    const weightLabel = <label>Weight(kg)</label>;
    const heightLabel = <label>Height(cm)</label>;
    expect(component.contains(weightLabel)).toEqual(true);
    expect(component.contains(heightLabel)).toEqual(true);
  })

  it('can change method', () => {
    const onChangeValue = stub();
    const component = shallow(<App onChangeValue={onChangeValue} />);
    const weightLabel = <label>Weight(lbs)</label>;
    const heightLabel = <label>Height(inches)</label>;
    component.find("CalculationMethod").prop('onChangeValue')({target: {value:'imperial'}});
    expect(component.contains(weightLabel)).toEqual(true);
    expect(component.contains(heightLabel)).toEqual(true);
  })
})

describe('<DisplayResult />', () => {
  it('displays the calulation correct(metric)', () => {
    const component = shallow(<DisplayResult method='metric' weight='100' height='195'/>)
    const response = <div id='response'>You are Overweight with a BMI of 26.3</div>
    expect(component.contains(response)).toEqual(true)
  })

  it('displays the calulation correct(imperial)', () => {
    const component = shallow(<DisplayResult method='imperial' weight='140' height='73'/>)
    const response = <div id='response'>You are Underweight with a BMI of 18.47</div>
    expect(component.contains(response)).toEqual(true)
  })

  it('does not show anything when one of the input fields are empty', () => {
    const component = shallow(<DisplayResult method='metric' weight='' height='195'/>);
    expect(component.text()).toBe('')
  })
})

describe('<CalculationMethod />', () => {
  it('has two methods to choose from', () => {
    const component = mount(<CalculationMethod />);
    const selector = component.find('#method').instance()
    expect(selector.options.length).toEqual(2)
  }
  )})