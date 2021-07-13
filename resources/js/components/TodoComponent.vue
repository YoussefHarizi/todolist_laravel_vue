<template>
   <!-- begin to do -->
   <div class="page-content page-container" id="page-content">
      <div class="padding">
         <div class="row container d-flex justify-content-center">
            <div class="col-md-12">
               <div class="card px-3">
                  <div class="card-body">
                      <!-- début formulaire d'ajout d'une nouvelle tâche -->
                     <form @submit.prevent="saveData">
                        <div class="add-items d-flex">
                           <input type="text" class="form-control todo-list-input" placeholder="Votre tâche ici !" v-model="form.name" :class="{'is-invalid' : form.errors.has('name')}"   @keydown="form.errors.clear('name')">
                           <button class="add btn btn-primary font-weight-bold todo-list-add-btn">Ajouter</button>

                        </div>
                        <!-- message d'erreur en cas de champ vide -->
                        <span class="text-danger pt-3 pb-3" style="font-size:16px;" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
                     </form>
                     <!-- fin formulaire -->

                     <div class="todo">
                         <!-- début affichage des tâches -->
                        <div v-for="todo in todos" :key="todo.id" class="w-100 d-flex align-items-center p-3 bg-white border-bottom">
                           <span class="mr-2">
                               <!-- icône svg tâche non complétée -->
                              <svg v-on:click="toggleTodo(todo)" v-if="todo.completed == false" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                 <path stroke="none" d="M0 0h24v24H0z"/>
                                 <circle cx="12" cy="12" r="9" />
                              </svg>
                              <!-- icône svg tâche complétée -->
                              <svg v-if="todo.completed == true" v-on:click="toggleTodo(todo)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CAF50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                 <path stroke="none" d="M0 0h24v24H0z"/>
                                 <circle cx="12" cy="12" r="9" />
                                 <path d="M9 12l2 2l4 -4" />
                              </svg>
                           </span>
                           <!-- nom de tâche  -->
                           <div  class="font-weight-bolder">
                               <!-- affichage non de tâche initial -->
                               <span v-if="editmode == false || editmode != todo.id">{{todo.name}}</span>
                                <!-- input pour permettre la modification de la tâche -->
                              <input v-if="editmode == todo.id"   v-model="todo.name" class="form-control" type="text">
                           </div>
                           <div class="ml-auto mr-2 d-flex align-items-center">
                              <span>
                                  <!-- icône edit -->
                                 <svg v-on:click="editmode = todo.id"  v-if="editmode != todo.id" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                    <line x1="16" y1="5" x2="19" y2="8" />
                                 </svg>
                                 <!-- icône validation de la modification -->
                                 <svg v-if="editmode == todo.id" v-on:click="updateTodo(todo)"  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checkbox" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4CAF50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <polyline points="9 11 12 14 20 6" />
                                    <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                 </svg>
                              </span>
                              <span>
                                  <!-- icône suppression d'une tâche par l'utilisateur autorisé -->
                                 <svg v-if="todo.user_id == iduser" v-on:click="deleteTodo(todo)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash ml-1" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FF5722" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <line x1="4" y1="7" x2="20" y2="7" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                 </svg>
                              </span>
                              <!-- icône et nom du propriètaire -->
                              <span>
                                  <img src="images/user_icon_2.svg" alt="" style="width:30px">
                                  <span>{{todo.user.name}}</span>
                              </span>
                           </div>
                        </div>
                        <!-- fin affichage des tâches  -->
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- end to do -->
   </div>
</template>

<script>
    export default {
        data(){
            return{
                editmode: false,
                todos:'',
                form: new Form({
                    name: '',
                    user_id: '',
                }),
                iduser:document.querySelector("meta[name='user-id']").getAttribute('content')
            }
        },
        methods:{
            deleteTodo(e){
                let data = new FormData();
                data.append('_method', 'DELETE')
                axios.post('/api/todo/'+e.id, data).then((res) =>{
                    this.todos = res.data
                }).catch((error) => {
                    this.form.errors.record(error.response.data.errors)
                })
            },
            updateTodo(e){
                this.editmode = false
                let data = new FormData();
                data.append('_method', 'PATCH')
                data.append('name', e.name)
                data.append('user_id', this.iduser)
                axios.post('/api/todo/'+e.id, data)
                .catch((error) => {
                    this.form.errors.record(error.response.data.errors)
                })
            },

            toggleTodo(e){
                e.completed = !e.completed
                let data = new FormData();
                data.append('_method', 'PATCH')
                if(e.completed == true){
                    data.append('completed', 1);
                }
                if(e.completed == false){
                    data.append('completed', 0)
                }
                axios.post('/api/todo/'+e.id, data)
            },
            getTodos(){
                    axios.get('/api/todo').then((res) =>{
                        this.todos = res.data
                    }).catch((error) =>{
                        console.log(error)
                    })
            },

            saveData(){
                let data = new FormData();

                data.append('name', this.form.name)
                data.append('user_id', this.iduser)
                axios.post('/api/todo', data).then((res) =>{
                    this.form.reset()
                     this.getTodos()
                }).catch((error) => {
                    this.form.errors.record(error.response.data.errors)
                })
            }
        },

        mounted() {
          this.getTodos()
        }
    }
</script>

