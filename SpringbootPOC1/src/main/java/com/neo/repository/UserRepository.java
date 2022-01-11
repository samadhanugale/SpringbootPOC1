package com.neo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neo.model.User;

public interface UserRepository extends JpaRepository<User,Integer>{

	List<User> findByFirstName(String firstName);
	
	List<User> findByFirstNameOrLastNameOrId(String firstName,String lastname,int id);

	List<User> findByLastName(String lastname);

	User findByPinCode(String pinCode);

	User findByUserId(int userId);

	User findByOrderByDob();
	
	List<User> findByStatus(int status);

	List<User> findByOrderByDojAsc();

	List<User> findByOrderByDobAsc();

}
