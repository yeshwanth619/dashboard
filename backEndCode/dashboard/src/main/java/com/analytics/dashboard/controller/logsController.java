// Import necessary packages
package com.analytics.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.analytics.dashboard.logsEntity.logsEntity;
import com.analytics.dashboard.service.logsService;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

// Define this class as a Spring REST Controller
@RestController
@RequestMapping("/logs")
public class logsController {

    // Inject the logsService dependency using Autowired
    private final logsService logService;

    @Autowired
    public logsController(logsService logService) {
        this.logService = logService;
    }


   
    
    // Define a POST endpoint to create logs
    @PostMapping("/create-log")
    public ResponseEntity<String> createLog(@RequestBody Long userId) {
        System.out.println(userId);
        // Create a new logsEntity and set its attributes
        logsEntity log = new logsEntity();
        log.setUserId(userId);
        log.setRequestData(Long.toString(userId));
        log.setTimestamp(LocalDateTime.now().withNano(0));
        try {
            // Simulate an API call failure with a 30% probability
            if (Math.random() < 0.2) {
                throw new Exception("API call failed");
            }
            
            // If successful, set log attributes accordingly and save it
            log.setStatus("success");
            log.setResponseData("Hello World");
            logService.createLog(log);
            return ResponseEntity.status(HttpStatus.CREATED).body("Hello World");
        } catch (Exception e) {
            // If there's an error, set log attributes for failure and save it
            log.setStatus("failure");
            log.setErrorMessage(e.getMessage()); 
            log.setResponseData(e.getMessage());
            logService.createLog(log);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("API call failed.");
        }
    }

    // Define a GET endpoint to retrieve statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
                                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        try {
            // Get statistics from the logService and return as a response
            Map<String, Object> stats = logService.getStats(startTime, endTime);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            // Handle exceptions and return an error response
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "An error occurred while processing your request."));
        }
    }

    // Define a GET endpoint to retrieve all logs within a time range
    @GetMapping("/all-logs")
    public ResponseEntity<List<logsEntity>> getAllLogs(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
                                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        try {
            // Get all logs from the logService within the specified time range
            List<logsEntity> logs = logService.getAllLogs(startTime, endTime);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            // Handle exceptions and return an empty list as an error response
            e.printStackTrace(); 
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }
}
