package com.klef.soa.exam.service;

import java.util.List;

import com.klef.soa.exam.entity.CommunityCenter;

public interface crudservice {
	public CommunityCenter addCenter(CommunityCenter center);
	public List<CommunityCenter> getAllCenter();
	public String deleteById(long id);
	
	
}
