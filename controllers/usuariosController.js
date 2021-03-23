exports.formCrearCuenta =(req,res)=>{
   res.render('crear-cuenta',{
       nombrePagina: 'Crea tu cuenta En devJobs',
       tagline: 'Comienza a publicar tus vacantes gratis,solo debescrear una cuenta '
   }) 
}