# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### DESIGN
###
### elave et duymelerini sag kunce yerleshdirmek
### headere el gezdirmek 
### sidebar menunun height-ini 100% dan cixarmaq
### duzelis ve sil emeliyyatlarini bir columna yerleshdirmek  +++

### CODE
### Cedvellerde axtarish
### Emeliyyatlardan sonra refresh problem (async) +++
### Routing +++s
### http url-leri dinamic idare (demo olaraq yekunlashdi) +++
### label-larin textlerini file-dan oxumaq
### teyyub terefden pagination
### barkoda gore axtaris +++
### img ve diger filelarla bagli codelarin optimizasiyasi 
### base64 paramin datan silinmesi (replace) meselen: data:application/vnd.ms-excel;base64, ve ya data:image/jpeg;base64,
### react pagination
### excel add zamani loading(waiting) yazmaq
### image-in sizeni ve visual olcusunu kiciltmek (sonradan qeyd: teyyub edecek bunu) 
### productlist ilk defeden gelmir (bax:barkod axtarisa gore) +++
### sekil add ederken bir meseleye diqqet etmek reqse getmek (backendde)
### sekil panelinde update buttonunu yigisdirmaq+++
### sekil panelinde data ikinci klikde gelir+++
### product excel add (eger fayl secilmeyibse buttonu passiv et)
### qeyde text area-ya deyismek
### productdaki qiymet fieldlerini anbara atmaq (butun cedvel ve modallarda)
### anbara diger qiymetler ve musteri satis qiymeti elavesi , kemiyet adi deyisilib olacaq say
### product page-de buttonlara duzelis

Global bugs: 
 1. Axirinci yazilmis data her defe Elave et zamani gelir, halbuki bos gelmelidir data 
 2. table-da uzun stringler dizayni pozur, limitlemek lazimdir. 
 3. Axtaris Textboxda da trim qoymaq
 4. Input textbox-larda trim 
 5. String TextBoxlara input penceresinde maxLength qoymaq, limit (Teyyubla danismaqla) 
 6. Eyni zamanda username, name kimi fieldlerde yaxsi olar ki minlength de qoymaq. 
 7. Imkan varsa pencerelesi responsive etmek (Sonda da edile biler)
 8. form reset
 9. form reseti hell etdikde ikinci defe form acilan kimi validate edir, bunu hell etmek
 10. form ilk input focus
 
 
Emekdaslar:  
 1. Table-da birinci fieldde textbox axtaris qoyduguna gore sutun adi yoxdu. (basga bir iki yerde de bu hal var)
 2. input zamani uzun string yazanda error 


Anbar Page: 
 1. Anbara mehsul daxil edende ya comboboxda ve ya hansisa bir formada yaxsi olar ki istifadece hem barkod nomresi ve ya ad ile axtaris edib mehsulu sece bilsin. Mecbur qalmasin ki yalniz barkod daxil etmekdir. 
 2. Hem barkod var hem Mehsul secimi, mentiqsizdi ve anbara mal daxil edende zaten barkoda ne yaziram goturur hec ele meshul yoxdu. 1-ci mesele hell olsa bu da hellin tapacaq 
 3. Anbarda table-da satis qiymeti gorunmur. 
 4. Anbarda tarix de qoymaq lazimdir mehsulun anbara geldiyi tarix, default now() dussun, user bunu deyise bilsin. Amma daxilde lazim olarsa bir dene de userin gormediyi insert_date tutmaq olar. 
 Table-da da bunu gostermek. Ozu de sort hemise anbara daxil olma tarixine gore desc getse yaxsidi 
 5. Table-da mehsul da gorunmur, halbu ki duzelis edende combo da gorunur. 
 

Mehsullar: 
 1. Elave et duymesi cox uzaqda qalir. pencere balacalasanda. 
 2. Sekilsiz mehsul elave olunmadi 
 3. Mehsul kemiyyet qiymet deyer hamsina -1 yaza bildim, 0 da yaza bildim 
 4. Satis qiymeti maya deyerinden asagi ola biler bilmez deqiqlesdirmek, olmazsa kontrol qoymaq. 
 5. Mehsul deyismesinde barkodu deyisme imkani. 
 6. Barkod eyni zamanda musterinin satis qiymetine de gedir dusur