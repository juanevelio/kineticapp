
import '../index.jsimport'
const vm =new vue({
el: "body",
data:{

},
methods:{
sockets(data){
data.on("lectura_serial",data=>data.tostring())
}

}
})