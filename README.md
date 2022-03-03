# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

`npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### CODE

img ve diger filelarla bagli codelarin optimizasiyasi

resetfields eslinde duz islemir, yalniz emeliyyat olduqdan sonra isleyir, halbuki modali elebele acib bagladiqda bele islemelidi (modal acarken reset olmalidi datalar)(useEffectLayout genis test edib yoxlamaq)


route ile linkleri goruntuden yigisdirmaq, yalniz base link olacaq 

paginationda page ve pagesize ilkin deyerlerini global const deyisen kimi saxlamq(basqa pencerelerde de istifade etmek ucun)

paginationla bagli xirda buglari nezerden kecirmek (esasen de productda) 

actionlarda (add delete update) dispatch listler cagirlir ,onlarin page parametri yoxdu onlari duzeldib test etmek

axios create problemi


mehsul page-ye axtarisha kateqoriya fieldi elave etmek

cardlist pagede category deyishdikde say inputunu deyismek 

category secildikden sonra gelen mehsullara gore axtaris (cartlist)

sebet tableda rowu silmek, say columundaki fieldi redakte etmek
iki button duymesi. 1)cap edecek pdfe, 2) sebet datani bazaya insert

sebete elave olunmus datadan response 200 qayitdisa o zaman sebet  tabledaki datani silmek

sebetde data var , sonra satis pageye qayidib yeniden sebete elave edende sebet datasi 0lanir ,bunu ele etmek lazimdirki data sifirlanmasin yalniz sebet insert gedende sifirlansin

mouse focus menu uzerinde olmadiqda menu baglansin

vacib: env faylindaki urli oz localimda localhost ile yazmaq lakin git ignora salmaq

sebet ucun iconun yerlesdiyi header(veya panel) pencereni scroll ederken daima yuxarida qalsin +++

headerin responsiveliyi ve scrool ederken header itmesWin

sebete elave ederken ikinci melumati sebete elave edende bele bir bir gondermek her birini ,bunu cartlistde duzeltmek

satis penceresinde mehsul combosuna barkodu da elave etmek ve axtarisinda her ikisi islesin(anbardaki product combobox kimi eynen) combonu secdikden sonra HEMIN XOMBOYA AID OLAN TEK DATA satisda gorsensin

jspdf utf problem

sekli sil buttonunun altinda sekli servisde cagirib silmek
### sonra

Imkan varsa pencerelesi responsive etmek (Sonda da edile biler)

label-larin textlerini file-dan oxumaq

anbar add edit modallarda product listi axtarisla getirmek

daxil olan userin(expeditor) musteri siyahisi verilcek

login olduqdan sonra user id-ye gore seller cagirilacaq (hem de goruntude gosterilecek)
seller id-ye gore ise musteri siyahisi gelecek, helelik musteri siyahsini cagirmaq ucun seller id-ni elnen verirem (id 6)

servis connection xetasini mesajla gostermek
 
### backend teyyub

Anbar tableda sort hemise anbara daxil olma tarixine gore desc getse yaxsidi

mehsullar / Satis qiymeti maya deyerinden asagi ola biler bilmez deqiqlesdirmek, olmazsa kontrol qoymaq. (teyyub)

paginationda 120ci pagede data olmadigi halda 120ci page-i qaytarir


product add update-de category ve property( diger fieldler de ola biler) insert update ollmur +++