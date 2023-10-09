// Import necessary packages and annotations
package com.analytics.dashboard.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.analytics.dashboard.logsEntity.logsEntity;
import com.analytics.dashboard.repository.logsRepository;
import com.analytics.dashboard.service.logsService;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Define this class as a Spring service
@Service
public class logsServiceImplementation implements logsService {

    // Inject the logsRepository dependency using Autowired
    private final logsRepository logRepository;

    @Autowired
    public logsServiceImplementation(logsRepository logRepository) {
        this.logRepository = logRepository;
    }

    // Implementation of the createLog method
    @Override
    public void createLog(logsEntity log) {
        logRepository.save(log);
    }

    // Implementation of the getStats method
    @Override
    public Map<String, Object> getStats(LocalDateTime startTime, LocalDateTime endTime) {
        // Initialize a map to store statistics
        Map<String, Object> stats = new HashMap<>();

        // Count the number of unique users within the specified time range
        long uniqueUsers = logRepository.countUniqueUsersBetweenTimestamps(startTime, endTime);

        // Count the number of failed status logs within the time range
        long failureCount = logRepository.countFailedStatusBetweenTimestamps(startTime, endTime);

        // Count the total number of calls within the time range
        long successCount = logRepository.countTotalCallsBetweenTimestamps(startTime, endTime);

        // Populate the statistics map
        stats.put("uniqueUsers", uniqueUsers);
        stats.put("totalCount", successCount);
        stats.put("failureCount", failureCount);

        return stats;
    }

    // Implementation of the getAllLogs method
    @Override
    public List<logsEntity> getAllLogs(LocalDateTime startTime, LocalDateTime endTime) {
        // Retrieve all logs within the specified time range from the repository
        List<logsEntity> logs = logRepository.findByTimestampBetween(startTime, endTime);

        return logs;
    }
}
