import React from 'react';
import {Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
  
class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.onAuth(values.username, values.email, values.password, values.confirm);
            this.props.history.push('/');
        }
      }); 
    };
  
    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

  
    render() {
      const { getFieldDecorator } = this.props.form;
  
 
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
          </Form.Item>

          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"/>
            )}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password" onBlur={this.handleConfirmBlur}/>)}
          </Form.Item>
          
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                    signup 
                </Button>
                Or
                <NavLink style={{marginRight: '10px'}} to='/login/'> login
                </NavLink>

            </Form.Item>
          
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
  const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);