package com.neo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neo.model.User;
import com.neo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User addUser(User user) {
		
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> getUserById(int userId) {
		return userRepository.findById(userId);
	}

	@Override
	public void deleteUserById(int userId) {
		 userRepository.deleteById(userId);		
	}
	

	@Override
	public List<User> getByFirstName(String firstName) {
		return userRepository.findByFirstName(firstName);
	}

	@Override
	public List<User> getByLastName(String surname) {
		
		return userRepository.findByLastName(surname);
	}

	@Override
	public User getByPinCode(String pinCode) {
		return userRepository.findByPinCode(pinCode);
	}

	@Override
	public User getUserByFlagId(int userId) {
		return userRepository.findByUserId(userId);
	}

	@Override
	public List<User> findByOrderByDojAsc() {
		return userRepository.findByOrderByDojAsc();
	}

	@Override
	public List<User> findByOrderByDobAsc() {
		return userRepository.findByOrderByDobAsc();
	}

	@Override
	public List<User> getUserByStatus(int status) {
		
		return userRepository.findByStatus(status);
	}

	@Override
	public List<User> getByFirstNameOrLastNameOrId(String firstName, String lastname, int id) {
		// TODO Auto-generated method stub
		return userRepository.findByFirstNameOrLastNameOrUserId(firstName, lastname, id);
	}
	
}
