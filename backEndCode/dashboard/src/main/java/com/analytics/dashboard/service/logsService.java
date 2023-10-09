// Define a service interface for managing logs
package com.analytics.dashboard.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import com.analytics.dashboard.logsEntity.logsEntity;

public interface logsService {
    // Method to create a new log entry
    void createLog(logsEntity log);
    
    // Method to retrieve statistics for a specified time range
    Map<String, Object> getStats(LocalDateTime startTime, LocalDateTime endTime);
    
    // Method to retrieve all logs within a specified time range
    List<logsEntity> getAllLogs(LocalDateTime startTime, LocalDateTime endTime);
}
