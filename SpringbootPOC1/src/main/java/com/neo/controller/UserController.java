package com.neo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.neo.model.User;
import com.neo.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	
	FilterProvider filters = new SimpleFilterProvider().addFilter("UserFilter", SimpleBeanPropertyFilter.filterOutAllExcept("userId","firstName","lastName","address","pinCode","dob","doj"));
	
	
	@PostMapping("/add")
	public User addUser(@RequestBody User user) {
		user.setStatus(0);
		log.info("User added");
		return userService.addUser(user);
	}
	
	@GetMapping("/default")
	public MappingJacksonValue getAllUsers(){
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getAllUsers());
		mapping.setFilters(filters);
		return mapping;
	}
	
	@GetMapping
	public MappingJacksonValue softDeleted(){
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getUserByStatus(0));
		mapping.setFilters(filters);
		log.info("Getting all users");
		return mapping;	
	}
	
	@GetMapping("/id/{userId}")
	public MappingJacksonValue getUserById(@PathVariable("userId")int userId) {
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getUserById(userId));
		mapping.setFilters(filters);
		log.info("Finding user by id : "+userId);
		return mapping;
	}
	
	@PutMapping("/update/{userId}")
	public User updateUser(@RequestBody User user,@PathVariable("userId")int userId) {
		Optional<User> check=userService.getUserById(userId);
		if(check.isPresent()) {
		user.setUserId(userId);
		log.info("Updating user by id : "+userId);
		return userService.addUser(user);
		}
		return user;
	}
	
	@DeleteMapping("/deleteDB/{userId}")
	public void hardDelete(@PathVariable("userId")int userId) {
		userService.deleteUserById(userId);
		log.warn("Deleting user from database by id : "+userId);
	}
	
     @DeleteMapping("/delete/{userId}")
	public MappingJacksonValue softDelete(@PathVariable("userId")int userId) {
		User user=userService.getUserByFlagId(userId);
		user.setStatus(1);
		MappingJacksonValue mapping = new MappingJacksonValue(userService.addUser(user));
		mapping.setFilters(filters);
		log.warn("Soft deleting user by id : "+userId);
		return mapping;
	}
     
     
     @DeleteMapping("/restore/{userId}")
 	public MappingJacksonValue restoreDelete(@PathVariable("userId")int userId) {
 		User user=userService.getUserByFlagId(userId);
 		user.setStatus(0);
 		MappingJacksonValue mapping = new MappingJacksonValue(userService.addUser(user));
 		mapping.setFilters(filters);
 		log.warn("restored user by id : "+userId);
 		return mapping;
 	}
	
	@GetMapping("/firstname/{firstName}")
	public MappingJacksonValue getByFirstName(@PathVariable("firstName") String firstName) {
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getByFirstName(firstName));
		mapping.setFilters(filters);
		log.info("Finding user by First Name : "+firstName);
		return mapping;
	}


	@GetMapping("/lastname/{lastname}")
	public MappingJacksonValue getByLastname(@PathVariable String lastname) {
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getByLastName(lastname));
		mapping.setFilters(filters);
		log.info("Finding user by Last Name : "+lastname);
		return mapping;		
	}
	
	@GetMapping("/firstLastId/{firstName}/{lastName}/{id}")
	public MappingJacksonValue getByFirstnameOrLastnameOrId(@PathVariable String firstName,@PathVariable String lastName,@PathVariable int id) {
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getByFirstNameOrLastNameOrId(firstName,lastName,id));
		mapping.setFilters(filters);
		log.info("Finding user by First Name : "+firstName+" or Last Name : "+lastName+" or id : "+id);
		return mapping;		
	}
	
	@GetMapping("/pincode/{pinCode}")
	public MappingJacksonValue getByPinCode(@PathVariable String pinCode) {
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getByPinCode(pinCode));
		mapping.setFilters(filters);
		log.info("Finding user by Pincode : "+pinCode);
		return mapping;		
	}
	
	@GetMapping("/doj")	
	public MappingJacksonValue findByOrderByDojAsc(){
		MappingJacksonValue mapping = new MappingJacksonValue(userService.findByOrderByDojAsc());
		mapping.setFilters(filters);
		log.info("Sorting users by Date of joining");
		return mapping;	
	 }
	
	@GetMapping("/dob")	
	public MappingJacksonValue findByOrderByDobAsc(){
		MappingJacksonValue mapping = new MappingJacksonValue(userService.findByOrderByDobAsc());
		mapping.setFilters(filters);
		log.info("Sorting users by Date of Birth");
		return mapping;	
	 }

	@GetMapping("/deleted")
	public MappingJacksonValue hardDeleted(){
		MappingJacksonValue mapping = new MappingJacksonValue(userService.getUserByStatus(1));
		mapping.setFilters(filters);
		log.info("Listing out Soft deleted users");
		return mapping;	
	}
	
	
}