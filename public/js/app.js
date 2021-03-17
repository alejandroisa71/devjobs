document.addEventListener('DOMContentLoaded',()=>{
  const skills =  document.querySelector('.lista-conocimientos');

  if(skills){
      skills.addEventListener('click', agregarSkills);
  }
})

const agregarSkills =(e)=>{
  if(e.target.getElementsByTagName === 'li'){
      console.log('si')
  }else{
      console.log('no')
  }
}