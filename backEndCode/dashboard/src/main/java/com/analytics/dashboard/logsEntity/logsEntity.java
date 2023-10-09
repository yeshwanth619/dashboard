// Import necessary packages for JPA annotations
package com.analytics.dashboard.logsEntity;

// Import JPA annotations from the Jakarta Persistence API
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

// Define this class as an entity for JPA
@Entity

// Specify the database table name
@Table(name = "logs")
public class logsEntity {

    // Define the primary key field and generation strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Define a column for the user ID
    @Column(name = "user_id")
    private Long userId;

    // Default constructor (no-argument constructor)
    public logsEntity() {
    }

    // Constructor with parameters to initialize all fields
    public logsEntity(Long id, Long userId, LocalDateTime timestamp, String status, String requestData,
                      String responseData, String errorMessage) {
        super();
        this.id = id;
        this.userId = userId;
        this.timestamp = timestamp;
        this.status = status;
        this.requestData = requestData;
        this.responseData = responseData;
        this.errorMessage = errorMessage;
    }

    // Getter and setter methods for each field

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRequestData() {
        return requestData;
    }

    public void setRequestData(String requestData) {
        this.requestData = requestData;
    }

    public String getResponseData() {
        return responseData;
    }

    public void setResponseData(String responseData) {
        this.responseData = responseData;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    // Define column specifications for each field

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Column(name = "status")
    private String status; // "success" or "failure"

    // Define "requestData" column with the "TEXT" data type
    @Column(name = "request_data", columnDefinition = "TEXT")
    private String requestData; // Store request data as a string

    // Define "responseData" column with the "TEXT" data type
    @Column(name = "response_data", columnDefinition = "TEXT")
    private String responseData; // Store response data as a string

    // Define "errorMessage" column with the "TEXT" data type
    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage; // Store error messages as a string
}
