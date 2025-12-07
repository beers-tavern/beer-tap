import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // صفحه لاگین
  {
    path: 'login',
    renderMode: RenderMode.Server,
  },
  // صفحه لیست بارها
  {
    path: 'bars',
    renderMode: RenderMode.Server,
  },
  // روت اصلی → همان رندر سمت سرور
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  // هر مسیر دیگری
  {
<<<<<<< HEAD
    path: 'bars',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
=======
    path: '**',
    renderMode: RenderMode.Server,
  },
>>>>>>> 85fe261 (Update KHA with auth & reviews)
];
