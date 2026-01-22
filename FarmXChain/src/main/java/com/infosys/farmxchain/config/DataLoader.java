package com.infosys.farmxchain.config;

import com.infosys.farmxchain.entity.*;
import com.infosys.farmxchain.repository.FarmerRepository;
import com.infosys.farmxchain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUser("admin@gmail.com", "Admin User", "123456789", Role.ADMIN);
        seedUser("farmer@gmail.com", "Farmer User", "123456789", Role.FARMER);
        seedUser("consumer@gmail.com", "Consumer User", "123456789", Role.CONSUMER);
        seedUser("distributor@gmail.com", "Distributor User", "123456789", Role.DISTRIBUTOR);
        seedUser("retailer@gmail.com", "Retailer User", "123456789", Role.RETAILER);
    }

    private void seedUser(String email, String name, String password, Role role) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = User.builder()
                    .email(email)
                    .name(name)
                    .password(passwordEncoder.encode(password))
                    .role(role)
                    .status(UserStatus.ACTIVE)
                    .isVerified(true)
                    .build();
            
            User savedUser = userRepository.save(user);
            System.out.println("Seeded user: " + email + " with role " + role);

            // If the user is a farmer, we also need to create a farmer profile
            if (role == Role.FARMER) {
                seedFarmer(savedUser);
            }
        }
    }

    private void seedFarmer(User user) {
        if (farmerRepository.findByUserId(user.getId()).isEmpty()) {
            Farmer farmer = Farmer.builder()
                    .user(user)
                    .farmName("Default Demo Farm")
                    .farmLocation("Demo Location")
                    .cropType("General Crops")
                    .verificationStatus(FarmerVerificationStatus.VERIFIED)
                    .farmSizeAcres(new BigDecimal("10.5"))
                    .build();
            farmerRepository.save(farmer);
            System.out.println("Seeded farmer profile for: " + user.getEmail());
        }
    }
}
