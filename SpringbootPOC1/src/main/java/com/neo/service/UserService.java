package com.neo.service;

import java.util.List;
import java.util.Optional;

import com.neo.model.User;


public interface UserService {
	
	public User addUser(User user);
	
	public List<User> getAllUsers();
	
	public Optional<User> getUserById(int userId);
	
	public List<User> getUserByStatus(int status);
	
	public void deleteUserById(int userId);

	public List<User> getByFirstName(String firstName);

	public List<User> getByLastName(String lastname);
	public List<User> getByFirstNameOrLastNameOrId(String firstName,String lastname,int id);

	public User getByPinCode(String pinCode);

	public User getUserByFlagId(int userId);


	public List<User> findByOrderByDojAsc();

	public List<User> findByOrderByDobAsc();

	
	
	

	

	


	
	

}
