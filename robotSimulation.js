class RobotSimulation {
    constructor() {
      // Core components
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.robot = null;
      
      // Configuration
      this.config = {
        moveSpeed: 0.08,
        rotationSpeed: 0.05,
        pathLength: 100,
        statsUpdateInterval: 100
      };
  
      // State management
      this.target = new THREE.Vector3();
      this.pathPoints = [];
      this.metrics = {
        distance: 0,
        rotations: 0,
        startTime: Date.now()
      };
  
      // DOM elements
      this.stats = {
        position: document.getElementById('stat-position'),
        speed: document.getElementById('stat-speed'),
        distance: document.getElementById('stat-distance'),
        rotations: document.getElementById('stat-rotations')
      };
  
      this.init();
    }
  
    init() {
      this.setupScene();
      this.createRobot();
      this.createEnvironment();
      this.setupEventListeners();
      this.animate();
    }
  
    setupScene() {
      // Scene setup
      this.scene = new THREE.Scene();
      this.scene.background = null;
  
      // Camera setup
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 15, 15);
      this.camera.lookAt(0, 0, 0);
  
      // Renderer setup
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('navCanvas'),
        alpha: true,
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  
    createRobot() {
      const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x4386b3,
        emissive: 0x1a344d,
        specular: 0xffffff,
        shininess: 100
      });
      
      this.robot = new THREE.Mesh(geometry, material);
      this.robot.rotation.x = Math.PI/2;
      this.scene.add(this.robot);
    }
  
    createEnvironment() {
      // Grid floor
      const grid = new THREE.GridHelper(20, 40, 0x444444, 0x666666);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);
  
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 5);
      this.scene.add(ambientLight, directionalLight);
    }
  
    setupEventListeners() {
      // Mouse movement
      document.addEventListener('mousemove', (e) => {
        const rect = document.getElementById('navCanvas').getBoundingClientRect();
        this.target.x = (e.clientX - rect.left) / rect.width * 20 - 10;
        this.target.z = (e.clientY - rect.top) / rect.height * 20 - 10;
      });
  
      // Touch support
      document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = document.getElementById('navCanvas').getBoundingClientRect();
        this.target.x = (touch.clientX - rect.left) / rect.width * 20 - 10;
        this.target.z = (touch.clientY - rect.top) / rect.height * 20 - 10;
        e.preventDefault();
      }, { passive: false });
  
      // Window resize
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  
    updateMetrics() {
      const runtime = (Date.now() - this.metrics.startTime) / 1000;
      
      // Update stats elements
      this.stats.position.textContent = 
        `${this.robot.position.x.toFixed(2)}, ${this.robot.position.z.toFixed(2)}`;
      
      this.stats.speed.textContent = 
        `${(this.config.moveSpeed * 60).toFixed(2)} m/s`;
      
      this.stats.distance.textContent = 
        `${this.metrics.distance.toFixed(2)} m`;
      
      this.stats.rotations.textContent = 
        this.metrics.rotations;
    }
  
    animate() {
      requestAnimationFrame(() => this.animate());
  
      // Calculate movement
      const direction = new THREE.Vector3()
        .subVectors(this.target, this.robot.position)
        .normalize();
  
      // Update position
      this.robot.position.add(direction.multiplyScalar(this.config.moveSpeed));
      this.metrics.distance += this.config.moveSpeed;
  
      // Update rotation
      if (direction.length() > 0.1) {
        const targetQuaternion = new THREE.Quaternion()
          .setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
        this.robot.quaternion.rotateTowards(targetQuaternion, this.config.rotationSpeed);
        this.metrics.rotations++;
      }
  
      // Update metrics
      this.updateMetrics();
  
      // Render scene
      this.renderer.render(this.scene, this.camera);
    }
  
    destroy() {
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('touchmove', this.handleTouchMove);
      this.renderer.dispose();
    }
  }
  
  // Initialize simulation
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
      new RobotSimulation();
    } else {
      console.error('Three.js not loaded - simulation disabled');
    }
  });