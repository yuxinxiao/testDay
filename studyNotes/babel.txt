# test
每日练习代码

create-react-app 构建一个react应用

$ sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
$ npm config set registry https://registry.npm.taobao.org

$ create-react-app my-app
$ cd my-app/
$ npm start

babel

babel项目安装

npm init 创建一个packpage.json
npm install --save-dev babel-cli    packpage.json中写入依赖

./node_modules/.bin/babel script.js  --out-file indemo.js    将编译后的结果放到新的文件中去
./node_modules/.bin/babel dir --out-d lib                    将编译后的结果放到新的文件夹中去
./node_modules/.bin/babel lib --watch --out-dir lib3         不断wacth old文件
./node_modules/.bin/babel lib --watch --out-dir lib3  可以在packpage.json中配置      后执行npm run build 

安装es2015插件

npm instal babel-preset-es2015
touch .babelrc    新建文本文件
ls -ls            列出隐藏命令
sudo  chmod 777  .babelrc    修改文件权限
vim .babelrc                    -------------->    {"presets":["es2015"]}

esc                     退出
:wq                     保修并退出修改后的文件

安装react插件
npm install babel-preset-react
npm init
npm install browser-sync --save-dev

browser-sync start --server forest --files "forest/indx.html,forest/css/*.css"



