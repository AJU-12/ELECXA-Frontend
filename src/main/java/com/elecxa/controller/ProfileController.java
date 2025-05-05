package com.elecxa.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.elecxa.dto.AddressDTO;
import com.elecxa.dto.UserDTO;
import com.elecxa.service.AddressService;
import com.elecxa.service.ProfileService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;
    
    @Autowired
    private AddressService addressService;

    
    @GetMapping
    public String showProfile(Model model , @RequestParam int id , HttpSession session) {
        UserDTO userProfile = profileService.getUserProfile(id);
        AddressDTO userAddress = addressService.getUserAddress(id);
        model.addAttribute("address", userAddress);
        model.addAttribute("userProfile", userProfile);
        model.addAttribute("activeTab", "profile");
        
        return "user/profile-new";
    }

    @PostMapping("/update")
    public String updateProfile(
            @ModelAttribute("userProfile") UserDTO userProfile,
            @ModelAttribute("address") AddressDTO userAddress,
            BindingResult result,
            HttpSession session,
            Model model) {
    	
    	
    	 long id = userProfile.getUserId();
         
         session.getAttribute("userId");
        
        if (result.hasErrors()) {
            model.addAttribute("activeTab", "profile");
            return "user/profile-new";
        }

        profileService.updateUserProfile(userProfile, id);
        addressService.updateUserAddress(userAddress, id);

        return "redirect:/profile?id=" + id;
    }
}
