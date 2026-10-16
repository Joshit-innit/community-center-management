package com.klef.soa.exam.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.CommunityCenter;
import com.klef.soa.exam.repository.crudRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class crudserviceImpl implements crudservice{
	@Autowired
	crudRepository repo;
	@Override
	public CommunityCenter addCenter(CommunityCenter center) {
		return repo.save(center);
	}

	@Override
	public List<CommunityCenter> getAllCenter() {
		
		return repo.findAll();
	}

	@Override
	public String deleteById(long id) {
		// TODO Auto-generated method stub
		Optional center = repo.findById(id);
		if (center.isPresent()) {
			repo.deleteById(id);
		}
		return "Center Id deleted!";
	}
	
}
