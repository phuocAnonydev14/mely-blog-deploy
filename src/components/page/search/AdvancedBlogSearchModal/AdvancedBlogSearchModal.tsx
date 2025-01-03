import AdvancedBlogSearchModalStyle from '@/components/page/search/AdvancedBlogSearchModal/AdvancedBlogSearchModal.style';
import Button from '@/components/common/Button/Button';
import { CategorySelector } from '@/components/common/Select/CategorySelector';
import { Col, Form, Row, Badge, Modal } from 'antd';
import { Filter } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

interface AdvancedBlogSearchDrawerProps {
  categories: string[];
}

export default function AdvancedBlogSearchModal({ categories = [] }: AdvancedBlogSearchDrawerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tagIdsList, setTagIdsList] = useState<string[]>(categories);

  const handleApplyFilter = () => {
    setOpen(false);
    const url = new URL(location.href);
    url.searchParams.delete('category');
    tagIdsList.forEach((id) => url.searchParams.append('category', id));
    setTagIdsList([]);
    router.push(url.toString());
  };

  return (
    <AdvancedBlogSearchModalStyle>
      <Button variant='solid' icon={<Filter />} onClick={() => setOpen(true)}>
        Advanced Search
        <Badge count={Number(categories.length > 0)} />
      </Button>
      <Modal
        centered
        title='Advanced Blog Search'
        width={550}
        open={open}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setOpen(false)}
        okText='Apply'
        onOk={handleApplyFilter}
      >
        <Form layout='vertical'>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name='categories' label='Categories'>
                <CategorySelector
                  tagIdsList={tagIdsList.length === 0 ? categories : tagIdsList}
                  setTagIdsList={(val) => setTagIdsList(val)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </AdvancedBlogSearchModalStyle>
  );
}
