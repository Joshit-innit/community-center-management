package com.klef.soa.exam.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exam_2400032515")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class CommunityCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	
	
	public String siteName;
	public String location;
	public int roomCount;
	public boolean open;
	
	
}	
