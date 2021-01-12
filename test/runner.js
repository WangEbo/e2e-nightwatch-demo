const cliServer = require('@vue/cli-service');

cliServer.server.then(()=>{

    const spawn = require('cross-spawn');

    const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })
    
    console.log(runner)
    
    runner.on('exit', function (code) {
      server.close()
      process.exit(code)
    })

    runner.on('error', function (err) {
      server.close()
      throw err
    })

})