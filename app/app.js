Vue.config.productionTip = false

const app = new Vue({
    data(){
        return{
            meensajeCrearPersona: {
                cuerpoMensaje: '',
                tipoMensaje: ''
            },
            formCrearPersona: {
                id: '',
                nombre: '',
                edad: ''
            },
            posicionPersonaEnEdicion: -1,
            formEditaPersona:{
                id: '',
                nombre: '',
                edad: ''
            },
            personas: []
        }
    },
    methods: {
        cargarUsuarios: function(){
            let url = '../json/personas.json'
            axios.get(url).then(response => {
                this.personas = response.data.personas
            })
        },
        agregarUsuario: function(){
            let error = false;
        
            if(this.formCrearPersona.edad == ''){
                this.meensajeCrearPersona = {
                    cuerpoMensaje: 'ERROR | La edad no puede estar vacia :(',
                    tipoMensaje: 'danger'
                }  
                error = true;
            }
            if(this.formCrearPersona.nombre == ''){
                this.meensajeCrearPersona = {
                    cuerpoMensaje: 'ERROR | El nombre no puede estar vacio :(',
                    tipoMensaje: 'danger'
                }    
                error = true;
            }
            if(this.formCrearPersona.id == ''){
                this.meensajeCrearPersona = {
                    cuerpoMensaje: 'ERROR | El id no puede estar vacio :(',
                    tipoMensaje: 'danger'
                }  
                error = true;
            }
            
            if(!error){
                this.personas.push(this.formCrearPersona)
                this.meensajeCrearPersona = {
                    cuerpoMensaje: 'Se agrego el usuario '+this.formCrearPersona.nombre+' satisfactoriamente :D',
                    tipoMensaje: 'success'
                } 
                this.formCrearPersona = {
                    id: '',
                    nombre: '',
                    edad: ''
                }                
            }
        },
        actualizaFormEditaPersona: function(pos, id, nombre, edad){
            this.posicionPersonaEnEdicion = pos
            this.formEditaPersona = {
                id: id,
                nombre: nombre,
                edad: edad
            }
        },
        editaElUsuario: function(){
            this.personas[this.posicionPersonaEnEdicion].id = this.formEditaPersona.id;
            this.personas[this.posicionPersonaEnEdicion].nombre = this.formEditaPersona.nombre;
            this.personas[this.posicionPersonaEnEdicion].edad = this.formEditaPersona.edad;
            document.getElementById('btn-close-modal').click()
        },
        exportarExcel: function(idTable, nombreExcelExportado){
            let linkDescarga;
            let tipoDescarga = 'application/vnd.ms-excel';
            let tablaADescargar = document.getElementById(idTable);
            
            let tablaHtml = tablaADescargar.outerHTML.replace(/ /g, '%20');
            
            nombreExcelExportado = nombreExcelExportado?nombreExcelExportado+'.xls':'excel_data.xls';
            
            //creamos un elemento link
            linkDescarga = document.createElement("a");
            document.body.appendChild(linkDescarga);
            
            if(navigator.msSaveOrOpenBlob){
                let blob = new Blob(['\ufeff', tablaHtml], {
                    type: tipoDescarga
                });
                navigator.msSaveOrOpenBlob( blob, nombreExcelExportado);
            }else{
                // Create a link to the file
                linkDescarga.href = 'data:' + tipoDescarga + ', ' + tablaHtml;
            
                // Setting the file name
                linkDescarga.download = nombreExcelExportado;
                
                //triggering the function
                linkDescarga.click();
            }
            
            
        }
    },
    mounted () {
        this.cargarUsuarios()
    }
}).$mount('#app')