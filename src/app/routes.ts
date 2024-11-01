export class AppRoutes {
  static readonly HOME = '/';

  static readonly LOGIN = '/auth/login';
  static readonly REGISTER = '/auth/register';
  static readonly FORGOT_PASSWORD = '/auth/forgot-password';

  static readonly USER_DETAILS = '/user';
  static readonly USER_EDIT = '/user/edit';

  static readonly BLOG_CREATE = '/blog/create';
  static readonly BLOG_DETAILS = '/blog/details';
  static readonly BLOG_EDIT = '/blog/edit';
  static readonly BLOG_REPORT = '/blog/report';

  private static readonly privateRoutes = [
    AppRoutes.USER_DETAILS,
    AppRoutes.USER_EDIT,
    AppRoutes.BLOG_CREATE,
    AppRoutes.BLOG_DETAILS,
    AppRoutes.BLOG_EDIT,
    AppRoutes.BLOG_REPORT,
  ];

  private static readonly publicRoutes = [
    AppRoutes.HOME,
    AppRoutes.LOGIN,
    AppRoutes.REGISTER,
    AppRoutes.FORGOT_PASSWORD,
    AppRoutes.BLOG_DETAILS,
    AppRoutes.USER_DETAILS,
  ];

  static isPrivateRoute(route: string) {
    return AppRoutes.privateRoutes.includes(route);
  }

  static isPublicRoute(route: string) {
    return AppRoutes.publicRoutes.includes(route);
  }
}
