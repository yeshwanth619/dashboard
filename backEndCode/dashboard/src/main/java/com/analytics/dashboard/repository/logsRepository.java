// Import necessary packages and annotations
package com.analytics.dashboard.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.analytics.dashboard.logsEntity.logsEntity;
import java.time.LocalDateTime;
import java.util.List;

// Define this interface as a Spring Data JPA repository
@Repository
public interface logsRepository extends JpaRepository<logsEntity, Long> {

    // Define a query method to find logs within a timestamp range
    List<logsEntity> findByTimestampBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Define a custom JPQL query to count unique users between timestamps
    @Query("SELECT COUNT(DISTINCT e.userId) FROM logsEntity e WHERE e.timestamp BETWEEN ?1 AND ?2")
    Long countUniqueUsersBetweenTimestamps(LocalDateTime startTime, LocalDateTime endTime);

    // Define a custom JPQL query to count failed status between timestamps
    @Query("SELECT COUNT(e) FROM logsEntity e WHERE e.status = 'failure' AND e.timestamp BETWEEN ?1 AND ?2")
    Long countFailedStatusBetweenTimestamps(LocalDateTime startTime, LocalDateTime endTime);

    // Define a custom JPQL query to count total calls between timestamps
    @Query("SELECT COUNT(e) FROM logsEntity e WHERE e.timestamp BETWEEN ?1 AND ?2")
    Long countTotalCallsBetweenTimestamps(LocalDateTime startTime, LocalDateTime endTime);
}
