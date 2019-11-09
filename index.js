"use strict"

function update() {}

async function image_get(appkit, args){
   var app  = args.a || args.app
   const resp1 = await appkit.api.get(`/apps/${app}`);
   console.log(resp1.image)
}

async function image_copy(appkit, args){
  var source = args.s || args.source
  var target = args.t || args.target
  const resp1 = await appkit.api.get(`/apps/${source}`);
  console.log(resp1.image) 
  var payload ={}
  payload.url="docker://"+resp1.image
  const resp2 = await appkit.api.post(JSON.stringify(payload), `/apps/${target}/builds`);
  appkit.terminal.vtable(resp2);
}


function init(appkit) {


    const copy_opts = {
        source: {
            alias: 's',
            string: true,
            description: 'source app name',
            demand: true
        },
        target: {
            alias: 't',
            string: true,
            description: 'target app name',
            demand: true
        }
    }

    const get_opts = {
          app: {
            alias: 'a',
            string: true,
            description: 'app name',
            demand: true
          }
     }


  appkit.args
        .command('image', 'get currrent image for an app', get_opts, image_get.bind(null, appkit))
        .command('image:copy', 'copy an image from one app to another',copy_opts, image_copy.bind(null, appkit))

}




module.exports = {
    init: init,
    update: update,
    group: 'imgae',
    help: 'various tools for manipulating images',
    primary: true
};

