import { User } from '@/common/@types/user.type';

export interface BlogMetadata {
  id: string;
  title: string;
  coverImg?: string;
  author: User | {};
  content: string;
  createdAt: Date;
}

class BlogService {
  private blogs: BlogMetadata[] = [
    {
      id: 'd8bf4753-cbca-50f1-8e07-2e7091c710e9',
      title: '10 Things Your Competitors Can Teach You About React - the UI library',
      coverImg: '/code_mely_avatar.jpg',
      author: {
        fullName: 'Mantrilogix',
        avatar: '/code_mely_avatar.jpg',
      },
      content: `<h2>Heading 1 (&lt;h2&gt;)</h2><h3>Heading 2 (&lt;h3&gt;)</h3><h4>Heading 3 (&lt;h4&gt;)</h4><p>Align left</p><p style="text-align:center;">Align center</p><p style="text-align:right;">Align right</p><p style="text-align:right;">&nbsp;</p><p>This text has <strong>bold</strong>, <i>italic</i>, <u>underline</u>, <i><strong><u>a combination of all these styles</u></strong></i>, <code>code</code>, H<sub>2</sub>SO<sub>4 </sub>, …</p><p>… and a URL too, <a href="https://youtu.be/dQw4w9WgXcQ?si=zVK8loX42hoI3-xP">click me</a></p><p>&nbsp;</p><p>Here's some JavaScript code:</p><pre><code class="language-typescript">function sayHello() {
	console.log("Mely say Hello");
}

sayHello();</code></pre><p>&nbsp;</p><p>How about some table?</p><figure class="table"><table><tbody><tr><td>#</td><td>Name</td><td>Year of birth</td></tr><tr><td>1</td><td>Hồ Anh Dũng</td><td>2004</td></tr><tr><td>2</td><td>Cao Đăng Tình</td><td>2003</td></tr><tr><td>3</td><td>Huỳnh Kim Huy</td><td>2003</td></tr><tr><td>4</td><td>Trương Thành Huy</td><td>2001</td></tr></tbody></table></figure><p>&nbsp;</p><p>My favourite frameworks:</p><ul><li>NextJS</li><li>React.JS</li><li>Spring<ul><li>Spring Boot</li><li>Spring Security</li></ul></li><li>Nest.JS</li></ul><p>How to learn JavaScript:</p><ol><li>Learn the basics</li><li>Learn the advanced</li><li>Give up because you can't learn it&nbsp;</li></ol><p>Nested list also works:</p><ul><li>Disc<ul><li>Circle<ul><li>Square<ul><li>Square, as well</li></ul></li></ul></li></ul></li></ul>`,
      createdAt: new Date('2024-04-15T13:44:15.261Z'),
    },
    {
      id: 'ad261fe4-250b-55d8-a900-301f11143d56',
      title: '17 Signs You Work With React - the UI library',
      author: {
        fullName: 'dung204',
        avatar: '/code_mely_avatar.jpg',
      },
      content: '',
      createdAt: new Date('2024-04-15T13:44:15.261Z'),
    },
  ];

  getAll() {
    return this.blogs;
  }

  getById(id: string) {
    const blog = this.blogs.find((blog) => blog.id === id);

    if (!blog) {
      throw new Error('Blog not found');
    }

    return blog;
  }
}

const blogService = new BlogService();
export default blogService;
