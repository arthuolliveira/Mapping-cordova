package com.mappingcordova.auth;

import com.mappingcordova.auth.dto.LoginRequest;
import com.mappingcordova.auth.dto.LoginResponse;
import com.mappingcordova.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        String token = authService.login(request);
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String role = user.getRole().name().replace("ROLE_", "");
        return ResponseEntity.ok(new LoginResponse(token, role));
    }
}