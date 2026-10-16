package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.exam.entity.CommunityCenter;
import com.klef.soa.exam.service.crudservice;

@Controller
@RestController
@RequestMapping("/crud")
public class crudController {
	@Autowired
	private crudservice service;
	
	@GetMapping("/")
	public String home() {
		return "Crud Service";
	}
	
	@PostMapping("/add")
	public ResponseEntity<CommunityCenter> addCenter(@RequestBody CommunityCenter center) {
		return new ResponseEntity<>(service.addCenter(center), HttpStatus.CREATED);
	}
	
	@GetMapping("DisplayAll")
	 public ResponseEntity<List<CommunityCenter>> displayAllCenters() {
		List<CommunityCenter> centers = service.getAllCenter();
		return ResponseEntity.ok(centers);
	}
	
	@DeleteMapping("Delete/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {
		service.deleteById(id);

        return ResponseEntity.ok("Center deleted successfully.");
	}
	
}
