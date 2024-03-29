## Structure project
```
├── README.md
├── angular.json
├── karma.conf.js
├── package-coppy.json
├── package.json
├── projects
│   ├── calendar                            # Micro app 1
│   └── mailbox                             # Micro app 2  
├── src                                     # Host app
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── core                            # Core module
│   │   │   ├── constants
│   │   │   ├── core.module.ts
│   │   │   ├── guard
│   │   │   ├── https
│   │   │   ├── interceptor
│   │   │   └── service
│   │   ├── data                            # Data module
│   │   │   ├── data.module.ts
│   │   │   ├── repo
│   │   │   ├── schema
│   │   │   └── service
│   │   ├── layout                          # Layout module
│   │   │   ├── auth-layout
│   │   │   ├── content-layout
│   │   │   ├── footer
│   │   │   └── nav
│   │   ├── modules                         # Các tính năng của app
│   │   │   ├── about
│   │   │   ├── auth
│   │   │   ├── contact
│   │   │   └── home
│   │   ├── shared                          # Shared module
│   │   │   ├── component
│   │   │   ├── directives
│   │   │   ├── material.module.ts
│   │   │   ├── service
│   │   │   └── shared.module.ts
│   │   └── types.d.ts
│   ├── assets                              # Asset 
│   │   ├── i18n
│   │   │   ├── en.json
│   │   │   └── vi.json
│   │   ├── images
│   │   │   ├── bg-screenshot.PNG
│   │   │   ├── mountain.png
│   │   │   ├── winter-photo.jpg
│   │   │   ├── winter-photo2.jpg
│   │   │   └── winter.jpg
│   │   └── scss
│   │       ├── _base.scss
│   │       └── _colors.scss
│   ├── environments                       # Environment
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── shared                             # Chia sẻ tài nguyên giữa các micro app
│   │   ├── components
│   │   │   └── components.shared.ts
│   │   ├── data
│   │   │   └── data.shared.ts
│   │   ├── directives
│   │   │   └── directives.share.ts
│   │   ├── layout
│   │   │   └── layout.shared.ts
│   │   ├── states
│   │   │   └── states.shared.ts
│   │   └── styles
│   │       ├── README.md
│   │       └── themes
│   ├── styles.scss
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── webpack.config.js
├── webpack.prod.config.js
└── yarn.lock
```

# CORE
  Phần core của hệ thống (http, auth, themes, root service, interceptor, constants).
# DATA
  Mọi dữ liệu truy xuất của app đều năm ở đây bao gồm remote model, local model, local store, http call data  thông qua (repo folder)
# LAYOUT
  Layout chứa các layout dùng chung cho toàn app như NAV, HEADER, FOOTER....:
# Modules
  Các page chức năng của app

# SHARED
  Chứa các thành phần dùng chung cho toàn app ví dụ như (các components (button, dropdown, input), directives, pipe)
# Styles
  Được sử dụng để lưu trữ các scss cho ứng dụng. Nó có thể chứa các chủ đề, Bootstrap, Angular Material ...
# Environments
  Chứa các biến môi trường, config, endpoint ....

# Asset
  Chứa tài nguyên của app bao gồm ảnh, i18n ...

# Shared giữa các micro app
  Chia sẻ state, layout, service, giữa các micro app với nhau như thế nào????


## CICD như thế nào
![CICD](./cicd.png)
# CI 
  - Chạy format code theo 1 chuẩn cho toàn dự án (npm run prettier)
  - Chạy lint kiểm tra syntax (theo 1 bộ lint tiêu chuẩn cộng đồng angular đề ra, hoặc custom dựa vào bộ rule tuỳ theo dự án) (npm run lint)
  - Chạy unit test (npm run test)
  - Commit code (Kiểm tra commit theo rule commit (bao gồm message, prefix...), hoặc tự custom theo bộ rule)

  => Tựa chung khi dev commit code (CI local sẽ chạy tất cả các step trên, nếu pass code mới được đẩy lên remote)
# CD
  Deploy => Docker
## Micro Frontends

> Good frontend development is hard. Scaling frontend development so that many teams can work simultaneously on a large and complex product is even harder.
> source: [https://martinfowler.com/articles/micro-frontends.html](https://martinfowler.com/articles/micro-frontends.html)

## Micro Frontends là gì?
Hiện nay, các ứng dụng Single Page Apps (SPAs) cực kỳ phổ biến, chúng có nhiều tính năng và cũng rất phức tạp và thường được kết hợp với kiến trúc Microservices ở tầng backend. Sau một thời gian phát triển, các ứng dụng SPAs này trở nên cồng kềnh, và khó hơn cho việc maintain và chúng được gọi là Frontend Monolith.

Trong những năm trở lại đây, việc áp dụng những concepts từ Microservices vào các ứng dụng Frontend được nhắc đến khá thường xuyên. Ý tưởng của Micro Frontends đó là sẽ phân tách các ứng dụng này thành các phần kết hợp của các tính năng, mỗi tính năng có thể được phát triển bới một team độc lập.

> "An architectural style where independently deliverable frontend applications are composed into a greater whole"

> source: [https://martinfowler.com/articles/micro-frontends.html](https://martinfowler.com/articles/micro-frontends.html)

### Monolithic Frontends

![Monolithic Frontends](https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png)

> source: [https://micro-frontends.org](https://micro-frontends.org)

### Micro Frontends

![Micro Frontends](https://micro-frontends.org/ressources/diagrams/organisational/verticals-headline.png)

> source: [https://micro-frontends.org](https://micro-frontends.org)
# Vấn đề cần giải quyết:

- Ứng dụng càng lúc càng phình ra về quy mô, cũng như độ phức tạp
- Một codebase FE duy nhất mà muốn maintain thì chỉ có gặp ác mộng hằng đêm
- Bạn có nhiều team FE khác nhau, mỗi team chỉ làm việc chính trên một phần tính năng nào đó rất cụ thể, chỉ 1 codebase mà hơn 5 team vào làm việc trên đó thì thôi xong
- Bạn muốn có 1 codebase viết bằng typescript, một codebase viết js, một feature được build bằng React, feature khác được build Vue

# Micro frontend là cái gì
Đây là cách tiếp cận cũng na ná như microservice, thay vì 1, chúng ta có nhiều codebase, và trên từng codebase chỉ quản lý một tính năng cụ thể mà thôi.

Có thể xem một ứng dụng web là một bộ kết hợp của nhiều tính năng, mỗi một tính năng như vậy được quản lý bởi một team
![Micro Frontends](https://topdev.vn/blog/wp-content/uploads/2020/10/deployment.png)

## Hiện thực hóa như thế nào
Để có thể hiện thực hóa hoàn chỉnh micro frontend sẽ bao gồm rất nhiều thứ, ở đây chỉ tóm tắt một số vấn đề cơ bản cần giải quyết
# Tương tác giữa các ứng dụng
Một câu hỏi được đặt ra đầu tiên là nếu tách ra thành nhiều bộ source như vậy, làm sao chúng có thể nói chuyện được với nhau? Một cách tổng quát, nên hạn chế việc trao đổi thông tin qua lại ít chừng nào tốt chừng đó, bởi vì nếu bạn làm ngược lại, nghĩa là bạn đang lặp lại vấn đề chúng ta muốn giải quyết ngay từ đâu: decoupling các tính năng với nhau

Nhưng việc trao đổi giữa các ứng dụng với nhau là không tránh khỏi và cần thiết, chúng ta chỉ tiết chế chứ không loại bỏ hết, Custom event là một cách, cách khác, lấy mô hình truyền callback và data từ trên xuống trong React để làm kênh trao đổi thông tin, làm như thế nó sẽ rất tường minh, cách thứ 3 là thông qua thanh đường dẫn trên trình duyệt, chút nữa nói kỹ hơn.

Tựa chung, chúng ta không share state, mà chỉ share dữ liệu trong database như microservice

# Thư viện component dùng chung
Nói chung, ý tưởng re-use lại những component UI không có gì mới, nghe cũng rất hợp lý, mặc dù ai cũng biết việc đó khó làm.

Sai lầm thường thấy là việc tạo các component như vậy quá sớm, việc hào hứng quá mức vào xây dựng một Framework UI chuẩn không cần chỉnh, viết một lần xài mãi mãi, thống nhất giao diện trên mọi mặt trận là điều thường thấy ở mọi team. Tuy nhiên, trong thực tế, kinh nghiệm cho biết rằng việc đó rất khó, nếu không muốn nói là không thể, không thể ngồi nghĩ ra một bộ Framework với tất cả các API cần thiết rồi đưa cho tất cả các team xài, chắc gì API đó đã đáp ứng đúng nhu cầu cho tất cả các team? Lời khuyên là các team cứ tạo ra những component riêng trong codebase nếu họ thấy cần, dù cho nó có bị duplicate đây nữa cũng chẳng sao. Và khi đã chín mùi, những API nào cần thiết sẽ hiện nguyên hình, chúng ta đưa những cho đang bị duplicate vào trong thư viện dùng chung.

Tất nhiên cũng có những ngoại lệ, những component mà nhìn vào chúng ta biết ngay là cần đưa vào share component, như icon, label, button, autocomplete, drop-down, search, table. Và nhớ là chỉ đưa đúng UI logic, đừng đưa bất kỳ business logic và domain logic vào đây. Ví dụ như một component ProductTable cho riêng cái domain Product là không nên, chỉ nên làm một cái component Table.

Thoạt nghe làm một share component có vẻ đơn giản, nhưng nó lại là công việc đòi hỏi kỹ thuật phải rất cứng tay, và người có nhúng tay vào tất cả các team.
# Styling
Styling là một câu chuyện dài, tựa chung mà nói bạn có thể dùng BEM, dùng SASS, dùng CSS module, dùng CSS-in-JS, dùng Styled Component, dùng Tailwind, kiểu gì cũng được, miễn đảm bảo được style không chồng chéo lên nhau, thằng nào độc lập thằng đó, và tự tin đoạn code nó sẽ chạy như đúng như lường trước
## Phương pháp để áp dụng Micro Frontends

- Iframe

Phương pháp này dễ để áp dụng nhưng có chứa nhiều giới hạn như việc navigation, thực thi các đoạn JavaScript từ Host App,
Nhược điểm của cách này là việc tích hợp giữa các phần của ứng dụng, như route, history, deep-link sẽ rất phức tạp, responsive cũng sẽ gặp nhiều vấn đề cần xử lý hơn

- Proxy like nginx
Phương pháp này yêu cầu việc phát triển các ứng dụng phải độc lập, ví dụ `<host>/mailbox`, `<host>/calendar` là các app Frontend khác nhau. Phương pháp này có một vấn đề là khi navigate từ app này sang app khác thì bạn sẽ bị reload giống như ứng dụng client-server thông thường.
- Web Components

Đây là một công nghệ không quá mới trong thời gian trở lại đây. Các framework áp dụng hoặc tạo ra Custom Elements khá nhiều. Ví dụ [Angular Elements](https://angular.io/guide/elements), [Stencil](https://stenciljs.com).
Chúng có ưu điểm là bạn có thể tạo ra được các element và có thể sử dụng như là một thẻ html thông thường ở bất cứ framework nào (Framework Agnostic)
- Orchestrator Frameworks

Webpack 5 and Module Federation, [piral](https://piral.io), [luigi](https://luigi-project.io/), [single-spa](https://single-spa.js.org/)

## Develop Email Client Micro Frontends

![Email Client Micro Frontends](./micro-fe-app.jpg)

Từ hình mô tả trên chúng ta có thể thấy rằng, ứng dụng email client của chúng ta sẽ có thể được phát triển bởi 2 team cho 2 chức năng là **mailbox** và **calendar**. Trong đó, team **calendar** có thể phát triển thêm một widget để có thể nhúng vào page của **mailbox**. Việc tạo ra các widget có thể được thực hiện thông qua Custom Elements.

### Shell or Host app
Để các micro app có thể chạy trên cùng một app, chúng ta cần có một shell (có thể được gọi là host). Shell sẽ setup một số thứ như routing, shared state, ... Việc tạo ra shell app có thể ảnh hưởng đến công nghệ cần áp dụng cho các micro app.

Ví dụ: nếu chúng ta lựa chọn Angular hay React làm shell app, thì các micro app sẽ phải có tầng wrapper để có thể chạy được các app đó. Vì routing của các framework trên là specific cho từng framework. Nên để route được, và render đúng component thì phải tuân thủ theo ràng buộc của framework đó.

### Chuẩn bị
Trong demo này, chúng ta sẽ sử dụng Webpack 5, trong bản release mới nhất nó đã giới thiệu một advanced API là Module Federation. Điều này giúp chúng ta dễ dàng phát triển được Micro Frontend.
Ngoài ra, chúng ta sẽ dùng Angular v11 (thời điểm này đang là RC) để tạo các app.

Đầu tiên, chúng ta cần tạo một shell app bằng lệnh sau.
```sh
npx @angular/cli@latest new acme-email-client
```

Sau khi tạo xong project, chúng ta sẽ tạo thêm 2 application nữa: 1 cho mailbox, 1 cho calendar.

```sh
npx ng generate application mailbox

npx ng generate application calendar
```

Ngoài ra, chúng ta cần dùng đến custom webpack config nên chúng ta cần install thêm một package là `@angular-builders/custom-webpack`.

```sh
npm i -D @angular-builders/custom-webpack
```

File `package.json` của chúng ta sẽ có dạng như sau:


```json
{
  "name": "acme-email-client",
  "scripts": {
    "start:shell": "ng serve --project=acme-email-client --port 5200",
    "start:mailbox": "ng serve --project=mailbox --port 5300",
    "start:calendar": "ng serve --project=calendar --port 5400"
  },
  "dependencies": {
    "@angular/animations": "~12.1.2",
    "@angular/common": "~12.1.2",
    "@angular/compiler": "~12.1.2",
    "@angular/core": "~12.1.2",
    "@angular/forms": "~12.1.2",
    "@angular/platform-browser": "~12.1.2",
    "@angular/platform-browser-dynamic": "~12.1.2",
    "@angular/router": "~12.1.2",
    "rxjs": "~6.6.0",
    "tslib": "^2.2.0",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-builders/custom-webpack": "^12.1.0",
    "@angular-devkit/build-angular": "~12.1.2",
    "@angular/cli": "~12.1.2",
    "@angular/compiler-cli": "~12.1.2",
    "@types/jasmine": "~3.8.0",
    "@types/node": "^12.11.1",
    "jasmine-core": "~3.8.0",
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.0.3",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "~1.7.0",
    "typescript": "~4.3.2"
  }
}
```

### Bật tính năng Module Federation
Để bật được tính năng này chúng ta cần sử dụng custom webpack như sau:
Bạn tạo ra các file webpack config, sau đó thay thế builder mặc định ở trong `angular.json`.

Ví dụ chúng ta tạo ra 2 files `webpack.config.js` và `webpack.prod.config.js` để sử dụng cho 2 môi trường là development và production.
Sau đó chúng ta sẽ thay thế trong `angular.json`:
- Thay `@angular-devkit/build-angular` bằng `@angular-builders/custom-webpack`.
- Thêm config của webpack mà chúng ta vừa tạo

Dưới đây là một phần của file `angular.json`.

```json
{
  "projects": {
    "acme-email-client": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          },
          "configurations": {
            "production": {
              "customWebpackConfig": {
                "path": "./webpack.prod.config.js"
              }
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "acme-email-client:build:production"
            },
            "development": {
              "browserTarget": "acme-email-client:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
      }
    },
  }
}
```

Sau đó chúng ta sẽ tạo tương tự cho các project `mailbox` và `calendar`.

#### Config Shell

Chúng ta cần config shell như sau để bật Module Federation:

```js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: "http://localhost:5200/",
    uniqueName: "acme-email-client"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        'mailbox': "mailbox@http://localhost:5300/remoteEntry.js",
        'calendar': "calendar@http://localhost:5400/remoteEntry.js",
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]
    })
  ],
};
```

Shell sẽ chạy ở port 5200, và chúng ta cần một unique name cho mỗi app. Ngoài ra, do shell sẽ trỏ đến 2 app remote, nên bạn sẽ thấy chúng ta config tương ứng cho 2 app remote luôn ở đây.

Do đang dùng các micro app bằng Angular, nên chúng ta có thể share các phần code, như config phía trên, chúng ta đã share 3 packages.

Giờ đây chúng ta có thể thêm config cho routing của shell để trỏ đến 2 micro app kia:

```ts
const routes: Routes = [
  {
    path: 'mailbox',
    loadChildren: () => import('mailbox/MailboxModule').then(m => m.MailboxModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('calendar/CalendarModule').then(m => m.CalendarModule)
  }
];
```

Có một vấn đề phát sinh lúc này đó là 2 đướng dẫn trên không thật sự tồn tại trong app shell, nó là đường dẫn ảo, do đó chúng ta cần bảo cho TypeScript biết rằng chúng có thật sự tồn tại.

Chúng ta chỉ cần tạo một file `types.d.ts` trong thư mục `src` là sẽ được.

```ts
declare module 'mailbox/MailboxModule';
declare module 'calendar/CalendarModule';
```

Giờ đây bạn có thể chạy shell để xem kết quả.

```sh
yarn start:shell
```

Nhưng app của chúng ta khi chạy sẽ báo lỗi như sau: `Uncaught Error: Shared module is not available for eager consumption`.
Điều này xảy ra do chúng ta đang shared các packages. Do đó chúng ta cần config thêm 1 số thứ để bootstrap được ứng dụng. Dựa theo bài viết này [https://medium.com/dev-genius/module-federation-advanced-api-inwebpack-5-0-0-beta-17-71cd4d42e534](https://medium.com/dev-genius/module-federation-advanced-api-inwebpack-5-0-0-beta-17-71cd4d42e534) chúng ta thấy có gợi ý như sau:

> **The recommended solution to eager imports**

>Methods mentioned above work, but can have some limits or drawbacks.

>At Webpack, we strongly recommend a dynamic import of a bootstrap file. Doing so will not create any additional Round Trips, it’s also more performant in general as initialization code is split out of a larger chunk.

Webpack khuyến cáo chúng ta tạo ra 1 file chứa phần import đó, và sẽ gọi dynamic import.

**bootstrap.ts**
```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
**main.ts**
```ts
import('./bootstrap');
```

Vậy là ứng dụng đã chạy được thành công.

#### Config Remotes app
Nếu chúng ta muốn navigate vào 2 micro app kia thì cũng cần config tương tự, nhưng cần một số thay đổi, vì những app đó là remotes app.

Config dưới đây là dành cho mailbox app.
```js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: "http://localhost:5300/",
    uniqueName: "mailbox"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mailbox",
      library: { type: "var", name: "mailbox" },
      filename: "remoteEntry.js",
      exposes: {
        './MailboxModule': './projects/mailbox/src/app/mailbox.module.ts',
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]
    })
  ],
};
```

Như các bạn cũng thấy, chúng ta config phần `output` giống như app shell vừa rồi. Phần khác biệt nhất là ở config cho `ModuleFederationPlugin`.

Chúng ta cần config một số fields như `name`, `library`, và đặc biệt là `fileName` cần giống với phần shell chúng ta đã config (ở đây là `remoteEntry.js`) và phần `exposes`.

Phần `exposes` cho phép chúng ta config những gì sẽ được public ra bên ngoài. Mỗi key của nó nên tuân theo [ESM syntax inside Node 14](https://medium.com/dev-genius/module-federation-advanced-api-inwebpack-5-0-0-beta-17-71cd4d42e534).


**Standalone-Mode cho Remotes app**: Ở đây chúng ta cũng có đề cập đến các package được shared. Do đó để chạy được mode này, tức là các micro app sẽ có thể chạy như app độc lập, chúng ta cũng sẽ áp dụng kỹ thuật tương tự đó là dùng dynamic import phần bootstrap như shell ở trên.

Các micro apps lúc này hoàn toàn có thể có phần config routing riêng tùy ý.

```ts
export const MAILBOX_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MailboxHomeComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  declarations: [
    MailboxHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MAILBOX_ROUTES),
  ],
  providers: [],
})
export class MailboxModule { }
```

Tương tự chúng ta có thể config cho calendar app như sau:

```js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: "http://localhost:5400/",
    uniqueName: "calendar"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "calendar",
      library: { type: "var", name: "calendar" },
      filename: "remoteEntry.js",
      exposes: {
        './CalendarModule': './projects/calendar/src/app/calendar/calendar.module.ts',
      },

      shared: ["@angular/core", "@angular/common", "@angular/router"]
    })
  ],
};
```

### Khỏi chạy ứng dụng

Giờ đây bạn có thể chạy cả 3 ứng dụng:
```sh
npm run start:shell
npm run start:mailbox
npm run start:calendar
```

Sau đó truy cập vào các địa chỉ sau:
[http://localhost:5200/](http://localhost:5200/), [http://localhost:5300/](http://localhost:5300/), [http://localhost:5400/](http://localhost:5400/)

Dưới đây là kết quả có được. Chúng ta có thể chạy standalone cho từng micro apps hoặc chạy chính từ shell app.

![Micro Frontends Angular](./micro-frontends.gif)

## References

Các bạn có thể đọc thêm ở các bài viết sau:

- https://medium.com/dev-genius/module-federation-advanced-api-inwebpack-5-0-0-beta-17-71cd4d42e534
- https://www.angulararchitects.io/aktuelles/the-microfrontend-revolution-part-2-module-federation-with-angular/
- https://martinfowler.com/articles/micro-frontends.html
