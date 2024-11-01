'use client';
import { Button, Col, DatePicker, Flex, Form, Input, Select, Typography } from 'antd';
import { UserEditStyle } from '@/app/(private)/setting/account/user-edit.style';
import DraggableImageUpload from '@/components/common/DraggableImageUpload';
import { genderConstant } from '@/common/constants/gender.constant';
import { useEffect } from 'react';
import { IUser } from '@/services/UserService';
import moment from 'moment';
import { useActionProfile } from '@/hooks/user/useActionProfile';
import { dateTo_yyyyMMdd } from '@/common/utils/time-convert.utils';

const UserEditPage = () => {
  const [{ user, isLoading }, { updateUser }] = useActionProfile();
  const [form] = Form.useForm<IUser>();
  useEffect(() => {
    if (!user) return;
    form.setFieldsValue({
      fullName: user.fullName ?? '',
      birthday: user?.birthday ? moment(user.birthday) : moment(new Date()),
      occupation: user.occupation ?? '',
      address: user.address ?? '',
      description: user.description,
      genderCode: user?.genderCode ?? '0',
      avatar: user.avatar ?? '',
    });
  }, [user]);
  const setCurrentFile = (value: any) => {
    console.log(value);
  };
  const onFinish = async (values: IUser) => {
    await updateUser({
      ...values,
      birthday: dateTo_yyyyMMdd(values.birthday.toString()),
    });
  };
  return (
    <UserEditStyle>
      <Flex align={'center'} className={'header-title'}>
        <Typography.Title level={3}>Profile</Typography.Title>
      </Flex>
      <div className={'form-action'}>
        <Form
          id={'form-profile'}
          initialValues={{ remember: true }}
          layout={'vertical'}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item<IUser>
            className={'image-background'}
            label={
              <Flex align={'center'} justify={'center'}>
                <Typography.Title className={'main-label'} level={5}>
                  Your background
                </Typography.Title>
                <Typography.Text>&nbsp;- recommended ratio 21:9</Typography.Text>
              </Flex>
            }
            name='avatar'
          >
            <DraggableImageUpload
              currentTempFile={user?.avatar ?? ''}
              setCurrentTempFile={setCurrentFile}
              url={user?.avatar}
            />
          </Form.Item>
          <Flex justify={'space-between'}>
            <Col span={16}>
              <Form.Item<IUser>
                label={
                  <Typography.Title className={'main-label'} level={5}>
                    Name
                  </Typography.Title>
                }
                name='fullName'
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item<IUser>
                label={
                  <Typography.Title className={'main-label'} level={5}>
                    Gender
                  </Typography.Title>
                }
                name='genderCode'
              >
                <Select options={genderConstant} />
              </Form.Item>
            </Col>
          </Flex>
          <Flex justify={'space-between'}>
            <Col span={16}>
              <Form.Item<IUser>
                label={
                  <Typography.Title className={'main-label'} level={5}>
                    Occupation
                  </Typography.Title>
                }
                name='occupation'
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item<IUser>
                label={
                  <Typography.Title className={'main-label'} level={5}>
                    Birthday
                  </Typography.Title>
                }
                name='birthday'
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Flex>
          <Form.Item<IUser>
            label={
              <Typography.Title className={'main-label'} level={5}>
                Address
              </Typography.Title>
            }
            name='address'
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label={
              <Typography.Title className={'main-label'} level={5}>
                Description
              </Typography.Title>
            }
            name='description'
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
      <Flex justify={'end'} align={'center'} className={'btn-submit'}>
        <Button type='primary' form={'form-profile'} htmlType='submit'>
          Submit
        </Button>
      </Flex>
    </UserEditStyle>
  );
};

export default UserEditPage;
