package com.neo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.Date;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import com.neo.model.User;
import com.neo.repository.UserRepository;

@SpringBootTest
class UserRegistrationApplicationTests {
	@Autowired
	private UserRepository userRepository;
	
	Date date = new Date();
	User user = new User(1,"Samadhan","Ugale","Pune","4321",date,date,0);

	@Test
	@DisplayName("Find All Users")
	void getAll() {
		assertFalse(userRepository.findAll().isEmpty());
	}
	
	@Test
	@AfterEach
	@DisplayName("Find User by ID")
	void findUserById() {
		assertEquals(user,userRepository.findById(1));
	}

	
	@Test
	@BeforeAll
	@DisplayName("Add User")
	void addUser() {
		Assert.notNull(userRepository.save(user));
	}
	
	@Test
	@DisplayName("Update User")
	void updateUser() {
		
		Assert.notNull(userRepository.save(user));
	}
	
	@Test
	@DisplayName("Search User by FirstName")
	void findByFirstName() {
		assertEquals(user,userRepository.findByFirstName("samadhan"));
	}
	
	@Test
	@DisplayName("Search User by LastName")
	void findByLastName() {
		assertEquals(user,userRepository.findByLastName("ugale"));
	}
	
	@Test
	@DisplayName("Search User by PinCode")
	void findByPinCode() {
		assertEquals(user,userRepository.findByPinCode("422209"));
	}
	
	@Test
	@DisplayName("Order By Date of Birth")
	void findByOrderByDob() {
		assertFalse(userRepository.findByOrderByDobAsc().isEmpty());
	}
	
	@Test
	@DisplayName("Order By Date of joining")
	void findByOrderByDoj() {
		assertFalse(userRepository.findByOrderByDojAsc().isEmpty());
	}
	@Test
	@AfterAll
	@DisplayName("Delete user by id")
	void deleteUserById() {
		userRepository.deleteById(3);
		assertThat(userRepository.existsById(1)).isFalse();
	}
}
