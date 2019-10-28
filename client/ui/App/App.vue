<template>
<div class="app">
	<h1>Simple Meteor example using Vue 2.x</h1>
	<img src="images/human.jpg" width="200">
	<p>
		You pressed the button {{count}} time(s).
	</p>
	<my-button :label="buttonLabel" @click="addOne"></my-button>
	<p>
		Learn more about the vue integration <a href="https://github.com/Akryum/meteor-vue-component">on GitHub</a>.
	</p>
	<hr />
	<test2></test2>
	<hr />

	<h3>Start Stop Meteor</h3>
	<button class="btn btn-success" @click="activate">activate</button>
	<button class="btn btn-danger" @click="deactivate">deactivate</button>
	<hr />

	<h3>Links</h3>
	<p></p>
	<div class="form-group">
		Title: <input class="form-control" v-model="newTitle" />
	</div>
	<div class="form-group">
		URL: <input class="form-control" v-model="newURL" />
	</div>
	<button class="btn btn-primary" @click="addData">Add</button>
	<div class="float-right"><input class="form-control" placeholder="Search" v-model="search" /></div>

	<hr />
	<div v-if="!$subReady.links">Loading...</div>
	<div v-if="links && links.length == 0 && search">Empty</div>
	<div v-else>
		<div v-for="link in links" :key="link._id">
			<div v-if="!editMode[link._id]">
				<p>Title: <b>{{link.title}}</b></p>
				<p>URL: <a :href="link.url">{{link.url}}</a></p>
				<p>Date: <span class="date">{{link.createdAt}}</span></p>
				<p v-if="link.updatedAt">Update Date: <span class="date">{{link.updatedAt}}</span></p>
				<button class="btn btn-primary" @click="editData(link._id)">Edit</button>
				<button class="btn btn-danger" @click="deleteData(link._id)">Delete</button>
			</div>
			<div v-if="editMode[link._id]">
				<form :ref="'form_'+link._id" @submit.prevent="editSubmit(link._id)">
					<div class="form-group">
						Title: <input class="form-control" name="title" :value="link.title" />
					</div>
					<div class="form-group">
						URL: <input class="form-control" name="url" :value="link.url" />
					</div>
					<button class="btn btn-success" type="submit">Edit Submit</button>
					<button class="btn btn-danger" @click="cancelSubmit(link._id)">Cancel Submit</button>
				</form>
			</div>
			<hr />
		</div>
	</div>
	<p>Totals: {{countLinks}}</p>
</div>
</template>
<script src="./App.js"></script>
